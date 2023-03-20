import Head from "next/head";

const GuestLayout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>PGVirtual Backoffice</title>
      </Head>

      <div className="font-sans text-gray-900 antialiased" style={{ height: "100vh" }}>{children}</div>
    </div>
  );
};

export default GuestLayout;
