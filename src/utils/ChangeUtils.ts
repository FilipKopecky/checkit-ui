import { Change } from "../model/Change";
import Constants from "./Constants";

export const resolveChangeDescription = (change: Change) => {
  console.log(change);
  return "Vytvoření definice pojmu";
};

export const resolveChangeState = (change: Change) => {
  if (change.object && change.newObject) {
    return Constants.CHANGE_DETAIL.TRIPLE_STATE.MODIFIED;
  } else if (!change.object && change.newObject) {
    return Constants.CHANGE_DETAIL.TRIPLE_STATE.CREATED;
  } else if (change.object && !change.newObject) {
    return Constants.CHANGE_DETAIL.TRIPLE_STATE.DELETED;
  }
  return "UNKNOWN";
};

export const PredicateMapper = {
  "http://www.w3.org/2004/02/skos/core#Collection": "SKOS_COLLECTION",
  "http://www.w3.org/2004/02/skos/core#Concept": "",
  "http://www.w3.org/2004/02/skos/core#ConceptScheme": "",
  "http://www.w3.org/2004/02/skos/core#OrderedCollection": "",
  "http://www.w3.org/2004/02/skos/core#altLabel": "",
  "http://www.w3.org/2004/02/skos/core#broadMatch": "",
  "http://www.w3.org/2004/02/skos/core#broader": "",
  "http://www.w3.org/2004/02/skos/core#broaderTransitive": "",
  "http://www.w3.org/2004/02/skos/core#changeNote": "",
  "http://www.w3.org/2004/02/skos/core#closeMatch": "",
  "http://www.w3.org/2004/02/skos/core#definition": "",
  "http://www.w3.org/2004/02/skos/core#editorialNote": "",
  "http://www.w3.org/2004/02/skos/core#exactMatch": "",
  "http://www.w3.org/2004/02/skos/core#example": "",
  "http://www.w3.org/2004/02/skos/core#hasTopConcept": "",
  "http://www.w3.org/2004/02/skos/core#hiddenLabel": "",
  "http://www.w3.org/2004/02/skos/core#historyNote": "",
  "http://www.w3.org/2004/02/skos/core#inScheme": "",
  "http://www.w3.org/2004/02/skos/core#mappingRelation": "",
  "http://www.w3.org/2004/02/skos/core#member": "",
  "http://www.w3.org/2004/02/skos/core#memberList": "",
  "http://www.w3.org/2004/02/skos/core#narrowMatch": "",
  "http://www.w3.org/2004/02/skos/core#narrower": "",
  "http://www.w3.org/2004/02/skos/core#narrowerTransitive": "",
  "http://www.w3.org/2004/02/skos/core#notation": "",
  "http://www.w3.org/2004/02/skos/core#note": "",
  "http://www.w3.org/2004/02/skos/core#prefLabel": "",
  "http://www.w3.org/2004/02/skos/core#related": "",
  "http://www.w3.org/2004/02/skos/core#relatedMatch": "",
  "http://www.w3.org/2004/02/skos/core#scopeNote": "",
  "http://www.w3.org/2004/02/skos/core#semanticRelation": "",
  "http://www.w3.org/2004/02/skos/core#topConceptOf": "",
};
