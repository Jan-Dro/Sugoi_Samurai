import React from "react";
import {Pagination, Button} from "@nextui-org/react";

export default function Pages() {
  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <div className="pages">
    <div className="flex flex-col gap-5">
      <p className="text-small text-default-500">Selected Page: {currentPage}</p>
      <Pagination
        total={10}
        color="secondary"
        page={currentPage}
        onChange={setCurrentPage}
      />
      <div id='letters' className="flex gap-2">
        <Button
          size="sm"
          variant="flat"
          color="secondary"
          onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
        >
          Previous
        </Button>
        <Button
          size="sm"
          variant="flat"
          color="secondary"
          onPress={() => setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))}
        >
          Next
        </Button>
      </div>
    </div>
    </div>
  );
}
