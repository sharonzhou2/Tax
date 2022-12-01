import { Box, Divider, Typography } from "@mui/material";
import React from "react";

const About = () => {
  return (
    <Box p={5}>
      <Typography variant="h3" letterSpacing={5} textTransform="uppercase">
        FAQ
      </Typography>
      <Box py={3}>
        <Typography variant="h4">
          1. The figures look incorrect and do not match the report?
        </Typography>
        <br></br>
        <Typography variant="h6">
          Please make sure you have selected the correct Managed Fund
          Distributor or the company that has sent out the dividends or
          otherwise it will not act the way it should. This is still a work in
          progress, if there are request to support a different ETF type please
          let me know by emailing me. You can reach out to me{" "}
          <a href="mailto:sz19991242p@gmail.com">sz19991242p@gmail.com</a>
        </Typography>
        <br></br>

        <Typography variant="h4">
          2. The ATO already has my TFN and I can already see my
          distributions/dividends. What is the point of this?
        </Typography>
        <br></br>

        <Typography variant="h6">
          Indeed the information provided by the ATO is mostly correct, however
          there are many instances where the ATO is unable to track all of the
          dividend/distribution statements. The onus is on us to make sure that
          all the information is correct, so this serves as a purpose of
          cross-checking the data is correct by removing all the mundane work
          that needs to be done.
        </Typography>
        <br></br>

        <Divider></Divider>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="10rem"
        >
          <Typography variant="h5">
            If you want to support me, please consider donating to keep this
            project running
          </Typography>
          <form
            action="https://www.paypal.com/donate"
            method="post"
            target="_top"
          >
            <input type="hidden" name="business" value="86HL593ZL9KRS" />
            <input type="hidden" name="no_recurring" value="0" />
            <input type="hidden" name="currency_code" value="AUD" />
            <input
              type="image"
              src="https://www.paypalobjects.com/en_AU/i/btn/btn_donateCC_LG.gif"
              name="submit"
              title="PayPal - The safer, easier way to pay online!"
              alt="Donate with PayPal button"
            />
            <img
              alt=""
              src="https://www.paypal.com/en_AU/i/scr/pixel.gif"
              width="1"
              height="1"
            />
          </form>
        </Box>
      </Box>
      <Typography variant="h4" letterSpacing={5} textTransform="uppercase">
        Misc Information
      </Typography>
      <Box py={3}>
        <Typography>
          Note that these tax calculations are based on the 2022/2023 ATO Tax
          Figures which can be found https://www.ato.gov.au/
        </Typography>
        <Typography>
          For further information or request for updated information or to
          report a broken import please reach out to me at{" "}
          <a href="mailto:sz19991242p@gmail.com">sz19991242p@gmail.com</a>
        </Typography>
      </Box>
      {/* <Typography variant="h4" letterSpacing={5} textTransform="uppercase">
        References
      </Typography> */}

      <Box py={3}>
        About Images retrieved by{" "}
        <a href="https://www.freepik.com/free-vector/net-income-calculating-abstract-concept-vector-illustration-salary-calculation-net-income-formula-take-home-pay-corporate-accounting-calculating-earnings-profit-estimation-abstract-metaphor_11668745.htm#query=tax&position=13&from_view=search&track=sph">
          Image by vectorjuice
        </a>{" "}
        on Freepik
      </Box>
    </Box>
  );
};

export default About;
