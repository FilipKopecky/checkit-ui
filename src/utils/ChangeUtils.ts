import { Change, ChangeType, ObjectData } from "../model/Change";
import { ChangeListData } from "../components/publications/PublicationReviewVocabulary";

export const isMapped = (uri: string): boolean => {
  return Boolean(UriToTranslationMapper[uri]);
};
export const createChangeListDataStructure = (
  changes: Change[]
): ChangeListData => {
  let allChanges = [];
  let headers: { uri: string; label: string }[] = [];
  let groupCounts = [];
  let paddedIndex: number[] = [];

  const grouped = changes.reduce<{
    [key: string]: Change[];
  }>(function (r, a) {
    r[a.subject] = r[a.subject] || [];
    r[a.subject].push(a);
    return r;
  }, Object.create(null));

  for (const [, value] of Object.entries(grouped)) {
    headers.push({
      uri: value[0].subject,
      label: value[0].label ?? value[0].subject,
    });
    allChanges.push(...value);
    groupCounts.push(value.length);
    if (paddedIndex.length === 0) {
      paddedIndex.push(value.length - 1);
    } else {
      paddedIndex.push(paddedIndex[paddedIndex.length - 1] + value.length);
    }
  }

  return {
    allChanges: allChanges,
    headers: headers,
    groupCounts: groupCounts,
    lastInGroupIndexes: paddedIndex,
  };
};

export const generateTripleFromChange = (change: {
  subject: string;
  predicate: string;
  object: ObjectData;
}): string => {
  let turtle = `<${change.subject}>\n<${change.predicate}>\n`;
  turtle += parseObjectValue(change.object) + " .";
  return turtle;
};

export const generateRestrictionTriples = (change: ChangeWrapper) => {
  if (!change.linkedChanges) return "";
  let parsedTurtle = `<${change.change.subject}> <${change.change.predicate}>`;
  for (let i = 0; i < change.linkedChanges.length; i++) {
    let linkedChange = change.linkedChanges[i];
    parsedTurtle += generateBlankNode(linkedChange.linkedChanges!);
    parsedTurtle += i !== change.linkedChanges.length - 1 ? ",\n" : ".\n";
  }
  return parsedTurtle;
};

const generateBlankNode = (changes: ChangeWrapper[]) => {
  let turtle = "";
  for (const change of changes) {
    turtle += `\n<${change.change.predicate}> `;
    if (change.linkedChanges?.length !== 0) {
      turtle += generateBlankNode(change.linkedChanges!);
    } else {
      turtle += parseObjectValue(change.change.object);
    }
    turtle += ";\n";
  }

  return `[${turtle}]\n`;
};

const parseObjectValue = (objectData: ObjectData) => {
  let turtle = "";
  if (objectData.type) {
    turtle += `"${objectData.value}"`;
    turtle += `^^<${objectData.type}>`;
    return turtle;
  }
  if (objectData.languageTag) {
    turtle += `"${objectData.value}"`;
    turtle += `@${objectData.languageTag}`;
    return turtle;
  }
  turtle += `<${objectData.value}>`;
  return turtle;
};

interface ChangeWrapper {
  change: Change;
  linkedChanges?: ChangeWrapper[];
}

export const parseRestrictionChangeToStructure = (change: Change) => {
  //Passed change contains multiple linked changes
  //Structure must be created
  if (!change.object.restriction?.affectedChanges) {
    console.log("Parsing could not be performed");
    return null;
  }
  let counter = 0;
  let prevCounter = -1;
  const structure: ChangeWrapper = { change: change, linkedChanges: [] };

  let unresolvedChanges = [...change.object.restriction?.affectedChanges];
  // If change is not matched immediately, the cycle needs to repeat
  let unmatchedChanges = [];

  while (unresolvedChanges.length !== 0) {
    for (const affectedChange of unresolvedChanges) {
      //Top level term
      if (affectedChange.subjectType !== "BLANK_NODE") {
        structure.linkedChanges?.push({
          change: affectedChange,
          linkedChanges: [],
        });
        counter++;
      } else {
        const foundSubject = findSubject(structure, affectedChange.subject);
        if (foundSubject) {
          foundSubject.linkedChanges?.push({
            change: affectedChange,
            linkedChanges: [],
          });
          counter++;
        } else {
          unmatchedChanges.push(affectedChange);
        }
      }
    }
    //If a run of matching could not find anything, we terminate the algo to prevent endless run
    if (prevCounter === counter) {
      console.log("Parsing could not be performed");
      return null;
    }
    unresolvedChanges = [...unmatchedChanges];
    unmatchedChanges = [];
    prevCounter = counter;
  }

  if (counter !== change.object.restriction.affectedChanges.length) {
    console.log("Parsing could not be performed");
    return null;
  }

  return structure;
};

const findSubject = (
  wrapper: ChangeWrapper,
  desiredUri: string
): ChangeWrapper | null => {
  if (wrapper.change.uri === desiredUri) {
    return wrapper;
  }
  for (const linkedChange of wrapper.linkedChanges ?? []) {
    const found = findSubject(linkedChange, desiredUri);
    if (found) return found;
  }
  return null;
};

export const getModificationColor = (type: ChangeType): string => {
  switch (type) {
    case "CREATED":
      return "#2EA903";
    case "REMOVED":
      return "#FF0000";
    case "MODIFIED":
    case "ROLLBACKED":
      return "#ED6C02";
  }
  return "";
};

/**
 * Mapping known properties to human-readable translations
 */
export const UriToTranslationMapper: {
  [uri: string]: { id: string; descriptionId: string };
} = {
  "http://www.w3.org/2004/02/skos/core#Concept": {
    id: "SKOS_CONCEPT",
    descriptionId: "DESCRIPTION_SKOS_CONCEPT",
  },
  "http://www.w3.org/2004/02/skos/core#definition": {
    id: "SKOS_DEFINITION",
    descriptionId: "DESCRIPTION_SKOS_DEFINITION",
  },
  "http://www.w3.org/2004/02/skos/core#broader": {
    id: "SKOS_BROADER",
    descriptionId: "DESCRIPTION_SKOS_BROADER",
  },
  "http://www.w3.org/2004/02/skos/core#narrower": {
    id: "SKOS_NARROWER",
    descriptionId: "DESCRIPTION_SKOS_NARROWER",
  },
  "http://www.w3.org/2004/02/skos/core#prefLabel": {
    id: "SKOS_PREF_LABEL",
    descriptionId: "DESCRIPTION_SKOS_PREF_LABEL",
  },
  "http://www.w3.org/2004/02/skos/core#altLabel": {
    id: "SKOS_ALT_LABEL",
    descriptionId: "DESCRIPTION_SKOS_ALT_LABEL",
  },
  "http://www.w3.org/2004/02/skos/core#hiddenLabel": {
    id: "SKOS_HIDDEN_LABEL",
    descriptionId: "DESCRIPTION_SKOS_HIDDEN_LABEL",
  },
  "http://www.w3.org/2004/02/skos/core#scopeNote": {
    id: "SKOS_SCOPE_NOTE",
    descriptionId: "DESCRIPTION_SKOS_SCOPE_NOTE",
  },
  "http://www.w3.org/2004/02/skos/core#inScheme": {
    id: "SKOS_IN_SCHEME",
    descriptionId: "DESCRIPTION_SKOS_IN_SCHEME",
  },
  "http://www.w3.org/2004/02/skos/core#exactMatch": {
    id: "SKOS_EXACT_MATCH",
    descriptionId: "DESCRIPTION_SKOS_EXACT_MATCH",
  },
  "http://www.w3.org/2004/02/skos/core#related": {
    id: "SKOS_RELATED",
    descriptionId: "DESCRIPTION_SKOS_RELATED",
  },
  "http://www.w3.org/2004/02/skos/core#relatedMatch": {
    id: "SKOS_RELATED_MATCH",
    descriptionId: "DESCRIPTION_SKOS_RELATED_MATCH",
  },
  "http://www.w3.org/2004/02/skos/core#notation": {
    id: "SKOS_NOTATION",
    descriptionId: "DESCRIPTION_SKOS_NOTATION",
  },
  "http://www.w3.org/2004/02/skos/core#example": {
    id: "SKOS_EXAMPLE",
    descriptionId: "DESCRIPTION_SKOS_EXAMPLE",
  },
  "http://www.w3.org/2004/02/skos/core#hasTopConcept": {
    id: "SKOS_HAS_TOP_CONCEPT",
    descriptionId: "DESCRIPTION_SKOS_HAS_TOP_CONCEPT",
  },
  "http://onto.fel.cvut.cz/ontologies/application/termit/pojem/je-draft": {
    id: "ONTO_FEL_IS_DRAFT",
    descriptionId: "DESCRIPTION_ONTO_FEL_IS_DRAFT",
  },
  "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
    id: "RDF_TYPE",
    descriptionId: "DESCRIPTION_RDF_TYPE",
  },
};
