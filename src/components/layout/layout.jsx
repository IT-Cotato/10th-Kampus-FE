export const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div id="modal-root" className="container relative flex flex-col">
        {children}
      </div>
    </div>
  );
};
