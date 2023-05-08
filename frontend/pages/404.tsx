import GuestLayout from "@/components/Layouts/GuestLayout";
const NotFoundPage = () => (
  <GuestLayout>
    <form>
      {/* <div className={"p-panel " + (isDarkMode ? "is-dark" : "")}> */}
      <div className={"p-panel"}>
        {/* <div className="p-panel__header" id="login-page-header">
            {/* <h4 className="p-panel__title">Login</h4>
          </div> */}

        <div
          className="u-vertically-center u-align--center"
          // id="login-page-panel"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundImage: "linear-gradient(to bottom, #2f6188, #102c4a 87%)",
          }}
        >
          <div className="p-card">
            <h3>404</h3>
            <p className="p-card__content">Page not found</p>
          </div>
        </div>
      </div>
    </form>
  </GuestLayout>
  //   );
);

export default NotFoundPage;
