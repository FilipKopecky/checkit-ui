import React from "react";
import {
  Link as RouterLink,
  useLocation,
  useMatch,
  useSearchParams,
} from "react-router-dom";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import Link, { LinkProps } from "@mui/material/Link";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { useAppSelector } from "../../hooks/ReduxHooks";
import { selectLabelCache } from "../../slices/labelCacheSlice";
import DifferenceOutlinedIcon from "@mui/icons-material/DifferenceOutlined";
import ContentPasteSearchOutlinedIcon from "@mui/icons-material/ContentPasteSearchOutlined";
import PlaylistAddCheckCircleOutlinedIcon from "@mui/icons-material/PlaylistAddCheckCircleOutlined";

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

const LinkRouter = (props: LinkRouterProps) => {
  return <Link {...props} component={RouterLink as any} />;
};
const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const labelCacheSelector = useAppSelector(selectLabelCache);
  // get vocabulary uri if present
  const [searchParams] = useSearchParams();
  const uri = searchParams.get("vocabularyUri");
  const vocabularyReviewMatch = useMatch(
    "/publications/:publicationId/vocabulary"
  );
  const intl = useIntl();

  const paths = location.pathname.split("/").filter((path) => path !== "");

  if (paths.length <= 1) return <></>;
  if (vocabularyReviewMatch) {
    //replaces path 'vocabulary' with the vocabulary uri
    paths[paths.length - 1] = uri ?? "";
  }

  const resolveLabel = (label: string) => {
    if (intl.messages[label]) {
      return intl.formatMessage({ id: label });
    } else {
      return labelCacheSelector[label] ?? label;
    }
  };

  //for now we show breadcrumbs only for publication
  //therefore it is possible to decide icon on index
  const resolveIcon = (index: number) => {
    switch (index) {
      case 0:
        return (
          <PlaylistAddCheckCircleOutlinedIcon
            sx={{ mr: 0.5 }}
            fontSize="inherit"
          />
        );
      case 1:
        return (
          <ContentPasteSearchOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        );
      case 2:
        return <DifferenceOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />;
    }
  };

  let relativePath = "";
  return (
    <Box pl={3} py={1}>
      <MuiBreadcrumbs>
        {paths.map((subPath, index) => {
          relativePath += `${subPath}/`;
          const last = index === paths.length - 1;
          return last ? (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                color: "text.primary",
              }}
            >
              {resolveIcon(index)}
              <Typography>{resolveLabel(subPath)}</Typography>
            </Box>
          ) : (
            <Box maxWidth={600} key={index}>
              <LinkRouter
                underline="hover"
                color="inherit"
                to={relativePath}
                key={index}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {resolveIcon(index)}
                  <Typography noWrap>{resolveLabel(subPath)}</Typography>
                </Box>
              </LinkRouter>
            </Box>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  );
};

export default Breadcrumbs;
