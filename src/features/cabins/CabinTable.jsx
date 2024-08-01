import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins } = useCabins();

  const [searchParams] = useSearchParams();

  // 1) FILTER
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabin;

  if (filterValue === "all") filteredCabin = cabins;

  if (filterValue === "no-discount")
    filteredCabin = cabins?.filter((cabin) => cabin.discount <= 0);

  if (filterValue === "with-discount")
    filteredCabin = cabins?.filter((cabin) => cabin.discount > 0);

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  const [field, direction] = sortBy.split("-");
  const modifir = direction === "asc" ? 1 : -1;
  const sortedData = filteredCabin?.sort(
    (a, b) => (a[field] - b[field]) * modifir
  );

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          //data={data}
          // data={filteredCabin}
          data={sortedData}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

export default CabinTable;
