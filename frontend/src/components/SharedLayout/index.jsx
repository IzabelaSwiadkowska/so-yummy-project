import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loader from "components/Loader";
import styles from "./SharedLayout.module.css";
import PolicyAndTerms from "components/PolicyAndTerms";

const SharedLayout = () => {
  return (
    <div className={styles.container}>
      Header
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      Footer
      <PolicyAndTerms />
    </div>
  );
};

export default SharedLayout;
