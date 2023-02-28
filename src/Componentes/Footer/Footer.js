import { Link, Stack, Typography } from "@mui/material";
import React from "react";
import "../Footer/Footer.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";

function Footer() {
  return (
    <footer className="footer">
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
        spacing={2}
        mt={1}
      >
        <div>
          <Typography>Johan Higuera</Typography>
          <Link
            href="https://www.linkedin.com/in/johan-daniel-higuera-rodriguez-ba6593208/"
            target="_blank"
            rel="noopener"
            color="inherit"
          >
            <LinkedInIcon sx={{ marginRight: "5px" }}></LinkedInIcon>
          </Link>
          <Link
            href="https://github.com/JohanHigueraR"
            target="_blank"
            rel="noopener"
            color="inherit"
          >
            <GitHubIcon sx={{ marginRight: "5px" }}></GitHubIcon>
          </Link>
          <Link
            href="https://wa.me/+573202612584"
            target="_blank"
            rel="noopener"
            color="inherit"
          >
            <WhatsAppIcon sx={{ marginRight: "5px" }}></WhatsAppIcon>
          </Link>
          <Link
            href="mailto:higuerad321@gmail.com"
            target="_blank"
            rel="noopener"
            color="inherit"
          >
            <EmailIcon sx={{ marginRight: "5px" }}></EmailIcon>
          </Link>
        </div>
        <div>
        <Typography>Simón López</Typography>
          <Link
            href="https://www.linkedin.com/in/simonlopezcalderon/"
            target="_blank"
            rel="noopener"
            color="inherit"
          >
            <LinkedInIcon sx={{ marginRight: "5px" }}></LinkedInIcon>
          </Link>
          <Link
            href="https://github.com/simonlopez10"
            target="_blank"
            rel="noopener"
            color="inherit"
          >
            <GitHubIcon sx={{ marginRight: "5px" }}></GitHubIcon>
          </Link>
          <Link
            href="https://wa.me/+573137465092"
            target="_blank"
            rel="noopener"
            color="inherit"
          >
            <WhatsAppIcon sx={{ marginRight: "5px" }}></WhatsAppIcon>
          </Link>
          <Link
            href="mailto:simon.lopezcalde@gmail.com"
            target="_blank"
            rel="noopener"
            color="inherit"
          >
            <EmailIcon sx={{ marginRight: "5px" }}></EmailIcon>
          </Link>
        </div>
      </Stack>
    </footer>
  );
}

export default Footer;
