import React, { useState } from "react";

interface File {
  name: string;
  isOpen?: boolean;
  files?: File[];
}

interface FileListProps {
  data: File[];
  path: number[];
  firstLevel: boolean;
  handleAddFile: (path: number[]) => void;
  handleConvertToFolder: (path: number[]) => void;
}

const FileList: React.FC<FileListProps> = ({
  data,
  path,
  firstLevel,
  handleAddFile,
  handleConvertToFolder,
}) => {
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({});

  const toggleFolder = (name: string) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  return (
    <ul>
      {Array.isArray(data) &&
        data.map((item, index) => {
          const currentPath = [...path, index];

          return (
            <li key={index}>
              <button
                onClick={() => toggleFolder(item.name)}
                onDoubleClick={() => handleConvertToFolder(currentPath)}>
                {item.name}{" "}
                {item.files ? (isOpen[item.name] ? "[-]" : "[+]") : ""}
              </button>

              {item.files && isOpen[item.name] && (
                <FileList
                  firstLevel={false}
                  path={currentPath}
                  data={item.files}
                  handleAddFile={handleAddFile}
                  handleConvertToFolder={handleConvertToFolder}
                />
              )}
            </li>
          );
        })}

      {firstLevel && (
        <li>
          <button onClick={() => handleAddFile(path)}>+</button>
        </li>
      )}
    </ul>
  );
};

export default FileList;
