import Head from "next/head";

const Seo = ({ pageTitle }) => (
  <>
    <Head>
      <title>
        {pageTitle && `${pageTitle} || Construction Recruitment`}
      </title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta charset="UTF-8" />
      <meta name="description" content="Find skilled construction professionals and rewarding job opportunities in the construction industry. Our construction recruitment website connects employers with talented candidates for various roles such as project managers, architects, engineers, contractors, and tradespeople. Explore candidate profiles, post job listings, and build your dream construction team today." />
      <meta name="keywords" content="construction recruitment, construction professionals, job opportunities, construction industry, employers, candidates, project managers, architects, engineers, contractors, tradespeople, candidate profiles, job listings, construction team" />
    </Head>
  </>
);

export default Seo;