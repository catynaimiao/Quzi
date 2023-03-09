import { Card, Typography } from "@mui/material";
import Link from "next/link";

const MenuItemCard = ({ title, url }) => (
  <Link href={url}>
    <Card sx={{ width: 275, m: 2, p: 2 }}>
      <Typography fontWeight={700}>{title}</Typography>
    </Card>
  </Link>
);

export default MenuItemCard;
