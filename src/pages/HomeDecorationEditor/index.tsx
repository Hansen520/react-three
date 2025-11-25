import Header from "./wight/Header";
import Menu from "./wight/Menu";
import Main from "./wight/Main";
import Properties from "./wight/Properties";
import "./index.less";

// import mesh from "./mesh";

function HomeDecorationEditor() {
  return (
    <div className="wrap">
      <Header />
      <div className="editor">
        <Menu />
        <Main />
        <Properties />
      </div>
    </div>
  );
}

export default HomeDecorationEditor;
