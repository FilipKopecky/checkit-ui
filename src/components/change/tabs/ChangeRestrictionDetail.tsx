import React from "react";
import { Box } from "@mui/material";
import GraphElement from "../../graph/GraphElement";
import GraphArc from "../../graph/GraphArc";
import { Change, ChangeState } from "../../../model/Change";
import ChangeActions from "../ChangeActions";
import { useResolveRestrictionChangeStateMutation } from "../../../api/publicationApi";
import { scrollToNextAvailableItem } from "../../../slices/eventSlice";
import { useAppDispatch } from "../../../hooks/ReduxHooks";

interface ChangeRestrictionDetailProps {
  change: Change;
}

const ChangeRestrictionDetail: React.FC<ChangeRestrictionDetailProps> = ({
  change,
}) => {
  const [resolveChangeMutation] = useResolveRestrictionChangeStateMutation();
  const dispatch = useAppDispatch();
  const resolveChange = (state: ChangeState) => {
    resolveChangeMutation({
      state: state,
      object: change.object,
      vocabularyUri: change.vocabularyUri,
      publicationId: change.publicationId,
      id: change.id,
    });
    dispatch(scrollToNextAvailableItem(change.id));
  };
  if (!change.object.restriction) return <></>;
  return (
    <Box pt={4}>
      <Box display={"flex"}>
        <GraphElement
          displayName={change.object.restriction.startName}
          uri={change.object.restriction.startUri}
        />
        <GraphArc
          arcName={change.object.restriction.relationName}
          arcUri={change.object.restriction.relationUri}
          cardinalityStart={change.object.restriction.cardinalityStart}
          cardinalityEnd={change.object.restriction.cardinalityEnd}
        />
        <GraphElement
          displayName={change.object.restriction.endName}
          uri={change.object.restriction.endUri}
        />
      </Box>
      <ChangeActions change={change} handleResolution={resolveChange} />
    </Box>
  );
};

export default ChangeRestrictionDetail;
