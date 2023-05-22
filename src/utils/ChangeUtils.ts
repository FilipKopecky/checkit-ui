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

export const generateTripleFromChange = (change: Change): string => {
  let turtle = "";
  if (change.subjectType === "BLANK_NODE") {
    const lastIndex = change.subject.lastIndexOf("/");
    const subjectId = change.subject.slice(lastIndex + 1);
    turtle = `_b:${subjectId}\n<${change.predicate}>\n`;
  } else {
    turtle = `<${change.subject}>\n<${change.predicate}>\n`;
  }
  turtle += parseObjectValue(change.object, change.id) + " .";
  return turtle;
};

const generateSpaces = (amount: number) => {
  return " ".repeat(amount);
};

export const generateRestrictionTriples = (change: ChangeWrapper) => {
  if (!change.linkedChanges) return "";
  let parsedTurtle = `<${change.change.subject}>\n${generateSpaces(2)}<${
    change.change.predicate
  }> \n`;
  parsedTurtle += generateBlankNode(change.linkedChanges!);
  parsedTurtle += ".\n";
  return parsedTurtle;
};

export const generateRestrictionTurtle = (enwrappingChange: ChangeWrapper) => {
  let turtle = "";
  if (!enwrappingChange.linkedChanges) return "";

  for (let i = 0; i < enwrappingChange.linkedChanges.length; i++) {
    turtle += generateRestrictionTriples(enwrappingChange.linkedChanges[i]);
  }
  return turtle;
};

const generateBlankNode = (changes: ChangeWrapper[], depth = 2) => {
  let turtle = "";
  for (const change of changes) {
    turtle += `\n${generateSpaces(depth * 2)}<${change.change.predicate}> `;
    if (change.linkedChanges?.length !== 0) {
      turtle += "\n" + generateBlankNode(change.linkedChanges!, depth + 1);
    } else {
      turtle += parseObjectValue(change.change.object, "");
    }
    turtle += ";";
  }

  return `${generateSpaces(depth * 2)}[${turtle}\n${generateSpaces(
    depth * 2
  )}]`;
};

const parseObjectValue = (objectData: ObjectData, id: string) => {
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
  turtle += objectData.value ? `<${objectData.value}>` : `_b:${id}`;
  return turtle;
};

export interface ChangeWrapper {
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
  "http://purl.org/dc/terms/created": {
    id: "DCTERMS_CREATED",
    descriptionId: "DESCRIPTION_DCTERMS_CREATED",
  },
  "http://purl.org/dc/terms/title": {
    id: "DCTERMS_TITLE",
    descriptionId: "DESCRIPTION_DCTERMS_TITLE",
  },
  "http://purl.org/dc/terms/rights": {
    id: "DCTERMS_RIGHTS",
    descriptionId: "DESCRIPTION_DCTERMS_RIGHT",
  },
  "http://purl.org/dc/terms/source": {
    id: "DCTERMS_SOURCE",
    descriptionId: "DESCRIPTION_DCTERMS_SOURCE",
  },
  "http://purl.org/dc/terms/description": {
    id: "DCTERMS_DESCRIPTION",
    descriptionId: "DESCRIPTION_DCTERMS_DESCRIPTION",
  },
  "http://purl.org/dc/terms/relation": {
    id: "DCTERMS_RELATION",
    descriptionId: "DESCRIPTION_DCTERMS_RELATION",
  },
  "http://purl.org/dc/terms/creator": {
    id: "DCTERMS_CREATOR",
    descriptionId: "DESCRIPTION_DCTERMS_CREATOR",
  },
  "http://purl.org/dc/terms/contributor": {
    id: "DCTERMS_CONTRIBUTOR",
    descriptionId: "DESCRIPTION_DCTERMS_CONTRIBUTOR",
  },
  "http://purl.org/dc/terms/identifier": {
    id: "DCTERMS_IDENTIFIER",
    descriptionId: "DESCRIPTION_DCTERMS_IDENTIFIER",
  },
  "http://purl.org/dc/terms/license": {
    id: "DCTERMS_LICENSE",
    descriptionId: "DESCRIPTION_DCTERMS_LICENSE",
  },
  "http://purl.org/dc/terms/format": {
    id: "DCTERMS_FORMAT",
    descriptionId: "DESCRIPTION_DCTERMS_FORMAT",
  },
  "http://onto.fel.cvut.cz/ontologies/application/termit/pojem/je-draft": {
    id: "ONTO_FEL_IS_DRAFT",
    descriptionId: "DESCRIPTION_ONTO_FEL_IS_DRAFT",
  },
  "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
    id: "RDF_TYPE",
    descriptionId: "DESCRIPTION_RDF_TYPE",
  },
  "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/má-glosář":
    {
      id: "A_POPIS_DAT_HAS_GLOSSARY",
      descriptionId: "DESCRIPTION_A_POPIS_DAT_HAS_GLOSSARY",
    },
  "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/má-model":
    {
      id: "A_POPIS_DAT_HAS_MODEL",
      descriptionId: "DESCRIPTION_A_POPIS_DAT_HAS_MODEL",
    },
  "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/má-dokumentový-slovník":
    {
      id: "A_POPIS_DAT_HAS_DOCUMENT",
      descriptionId: "DESCRIPTION_A_POPIS_DAT_HAS_DOCUMENT",
    },
  "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/je-částí-dokumentu":
    {
      id: "A_POPIS_DAT_IS_PART_OF_DOCUMENT",
      descriptionId: "DESCRIPTION_A_POPIS_DAT_IS_PART_OF_DOCUMENT",
    },
  "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/má-soubor":
    {
      id: "A_POPIS_DAT_HAS_FILE",
      descriptionId: "DESCRIPTION_A_POPIS_DAT_HAS_FILE",
    },
  "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/popisuje-dokument":
    {
      id: "A_POPIS_DAT_DESCRIBES_DOCUMENT",
      descriptionId: "DESCRIPTION_A_POPIS_DAT_DESCRIBES_DOCUMENT",
    },
  "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/je-pojmem-ze-slovníku":
    {
      id: "A_POPIS_DAT_IS_A_VOCABULARY_TERM",
      descriptionId: "DESCRIPTION_A_POPIS_DAT_IS_A_VOCABULARY_TERM",
    },
  "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/má-křestní-jméno":
    {
      id: "A_POPIS_DAT_HAS_FIRST_NAME",
      descriptionId: "DESCRIPTION_A_POPIS_DAT_HAS_FIRST_NAME",
    },
  "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/má-příjmení":
    {
      id: "A_POPIS_DAT_HAS_LAST_NAME",
      descriptionId: "DESCRIPTION_A_POPIS_DAT_HAS_LAST_NAME",
    },
  "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/importuje-slovník":
    {
      id: "A_POPIS_DAT_IMPORTS_VOCABULARY",
      descriptionId: "DESCRIPTION_A_POPIS_DAT_IMPORTS_VOCABULARY",
    },
  "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/je-pojmem":
    {
      id: "A_POPIS_DAT_IS_TERM",
      descriptionId: "DESCRIPTION_A_POPIS_DAT_IS_TERM",
    },
  "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/je-záznamem":
    {
      id: "A_POPIS_DAT_IS_RECORD",
      descriptionId: "DESCRIPTION_A_POPIS_DAT_IS_RECORD",
    },
  "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/má-autora":
    {
      id: "A_POPIS_DAT_HAS_AUTHOR",
      descriptionId: "DESCRIPTION_A_POPIS_DAT_HAS_AUTHOR",
    },
  "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/má-editora":
    {
      id: "A_POPIS_DAT_HAS_EDITOR",
      descriptionId: "DESCRIPTION_A_POPIS_DAT_HAS_EDITOR",
    },
  "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/má-novou-hodnotu":
    {
      id: "A_POPIS_DAT_HAS_NEW_VALUE",
      descriptionId: "DESCRIPTION_A_POPIS_DAT_HAS_NEW_VALUE",
    },
  "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/má-posledního-editora":
    {
      id: "A_POPIS_DAT_HAS_LATEST_EDITOR",
      descriptionId: "DESCRIPTION_A_POPIS_DAT_HAS_LATEST_EDITOR",
    },
  "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/má-původní-hodnotu":
    {
      id: "A_POPIS_DAT_HAS_ORIGINAL_VALUE",
      descriptionId: "DESCRIPTION_A_POPIS_DAT_HAS_ORIGINAL_VALUE",
    },
  "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/má-zdroj":
    {
      id: "A_POPIS_DAT_HAS_SOURCE",
      descriptionId: "DESCRIPTION_A_POPIS_DAT_HAS_SOURCE",
    },
  "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/má-změněnou-entitu":
    {
      id: "A_POPIS_DAT_HAS_CHANGED_ENTITY",
      descriptionId: "DESCRIPTION_A_POPIS_DAT_HAS_CHANGED_ENTITY",
    },
  "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/má-změněný-atribut":
    {
      id: "A_POPIS_DAT_HAS_CHANGED_ATTRIBUTE",
      descriptionId: "DESCRIPTION_A_POPIS_DAT_HAS_CHANGED_ATTRIBUTE",
    },
  "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/má-datum-a-čas-modifikace":
    {
      id: "A_POPIS_DAT_HAS_DATE_AND_TIME_OF_MODIFICATION",
      descriptionId:
        "DESCRIPTION_A_POPIS_DAT_HAS_DATE_AND_TIME_OF_MODIFICATION",
    },
  "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/má-datum-a-čas-poslední-modifikace":
    {
      id: "A_POPIS_DAT_HAS_DATE_AND_TIME_OF_LAST_MODIFICATION",
      descriptionId:
        "DESCRIPTION_A_POPIS_DAT_HAS_DATE_AND_TIME_OF_LAST_MODIFICATION",
    },
  "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/má-datum-a-čas-vytvoření":
    {
      id: "A_POPIS_DAT_HAS_DATE_AND_TIME_OF_CREATION",
      descriptionId: "DESCRIPTION_A_POPIS_DAT_HAS_DATE_AND_TIME_OF_CREATION",
    },
  "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/má-heslo":
    {
      id: "A_POPIS_DAT_HAS_PASSWORD",
      descriptionId: "DESCRIPTION_A_POPIS_DAT_HAS_PASSWORD",
    },
  "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/má-uživatelské-jméno":
    {
      id: "A_POPIS_DAT_HAS_USER_NAME",
      descriptionId: "DESCRIPTION_A_POPIS_DAT_HAS_USER_NAME",
    },
  "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/má-id-aplikace":
    {
      id: "A_POPIS_DAT_HAS_APPLICATION_ID",
      descriptionId: "DESCRIPTION_A_POPIS_DAT_HAS_APPLICATION_ID",
    },
  "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/má-typ-přílohy":
    {
      id: "A_POPIS_DAT_HAS_ATTACHMENT_TYPE",
      descriptionId: "DESCRIPTION_A_POPIS_DAT_HAS_ATTACHMENT_TYPE",
    },
  "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/vychází-z-verze":
    {
      id: "A_POPIS_DAT_ORIGINATES_FROM_VERSION",
      descriptionId: "DESCRIPTION_A_POPIS_DAT_ORIGINATES_FROM_VERSION",
    },
  "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/má-přílohu":
    {
      id: "A_POPIS_DAT_HAS_ATTACHMENT",
      descriptionId: "DESCRIPTION_A_POPIS_DAT_HAS_ATTACHMENT",
    },
  "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/má-aplikační-kontext":
    {
      id: "A_POPIS_DAT_HAS_APPLICATION_CONTEXT",
      descriptionId: "DESCRIPTION_A_POPIS_DAT_HAS_APPLICATION_CONTEXT",
    },
  "http://www.w3.org/2000/01/rdf-schema#subClassOf": {
    id: "RDFS_SUBCLASS",
    descriptionId: "DESCRIPTION_RDFS_SUBCLASS",
  },
  CUSTOM_RELATIONSHIP: {
    id: "CUSTOM_RELATIONSHIP",
    descriptionId: "DESCRIPTION_CUSTOM_RELATIONSHIP",
  },
};
