import Typography from "@mui/material/Typography";

export default function UnderlinedTypography({text}) {
  return (
    <Typography
      noWrap
      component="div"

      sx={{
        color: "secondary.dark",
        fontSize: 16,
        fontWeight: "lighter",
        display: "inline",
        verticalAlign: "middle",
        textTransform:"none",
        textDecoration: "underline GrayText solid",
        marginX: "15px",
        textUnderlineOffset: 4.5,
        ":hover": {
          color: "secondary.main",
          textDecoration: "underline secondary.main",
        },
      }}
    >
      {text}
    </Typography>
  );
}
