import WindowWrapper from "../hoc/WindowWraper";

const Terminal = () => {
  return (
    <>
      <div id="window-header">
        <p>Window controls</p>
        <h2>Tech Stacks</h2>
      </div>
      <div className="techstack">
        <p>
          <span className="font-bold">@hasibul % </span>
          show tech stack
        </p>
      </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
