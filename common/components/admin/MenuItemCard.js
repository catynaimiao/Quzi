import { Card, Typography, Stack } from "@mui/material";
import Link from "next/link";

const MenuItemCard = ({ title, url, Icon }) => (
  <Link href={url}>
    <Card
      sx={{ width: 275, m: 1, p: 2, background: "#202023", color: "#E2E7E3" }}>
      <Stack direction='row' spacing={2}>
        <Icon />
        <Typography fontWeight={700}>{title}</Typography>
      </Stack>
    </Card>
  </Link>
);

export default MenuItemCard;
