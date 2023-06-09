import React from "react";
import style from "./SubTask.module.scss";
import { TSubtask } from "../../types/project";
import GlobalSvgSelector from "../../assets/icons/GlobalSvgSelector";

interface SubtaskProps {
  subtask: TSubtask;
  handleSubtask: (item: TSubtask, checked: boolean) => void;
  deleteSubtask: (taskId: string) => void;
}

const Subtask: React.FC<SubtaskProps> = ({
  subtask,
  handleSubtask,
  deleteSubtask,
}) => {
  const onChange = () => {
    handleSubtask(subtask, !subtask.checked);
  };
  return (
    <div className={style.subtask}>
      <input type="checkbox" checked={subtask.checked} onChange={onChange} />
      <div
        className={`${style.subtask_title} ${
          subtask.checked ? style.subtask_complete : ""
        }`}
      >
        {subtask.title}
      </div>
      <button onClick={() => deleteSubtask(subtask.id)}>
        <GlobalSvgSelector id="x"></GlobalSvgSelector>
      </button>
    </div>
  );
};

export default Subtask;
