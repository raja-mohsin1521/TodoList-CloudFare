import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Note } from "./NotesContainer";


interface SortSelectorProps {
  data: Note[];
  onSort: (sortedNotes: Note[]) => void;
}

function SortSelector({ data, onSort }: SortSelectorProps) {
  const [sortType, setSortType] = useState<string>("default");

  const handleSort = (type: string) => {
    let sortedData: Note[] = [...data];

    switch (type) {
      case "newest":
        sortedData.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "oldest":
        sortedData.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;

      default:
        break;
    }

    onSort(sortedData);
    setSortType(type);
  };

  return (
    <Dropdown className="mt-2">
      <Dropdown.Toggle variant="secondary">
        {sortType === "default"
          ? "Default"
          : sortType === "newest"
          ? "Sorted by Newest"
          : sortType === "oldest"
          ? "Sorted by Oldest"
          : "Default"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          active={sortType === "default"}
          onClick={() => handleSort("default")}
        >
          Default
        </Dropdown.Item>
        <Dropdown.Item
          active={sortType === "newest"}
          onClick={() => handleSort("newest")}
        >
          Newly First
        </Dropdown.Item>
        <Dropdown.Item
          active={sortType === "oldest"}
          onClick={() => handleSort("oldest")}
        >
          Oldest First
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SortSelector;
