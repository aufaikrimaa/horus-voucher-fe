import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getVouchersClaimed } from "@/redux/slice/voucherSlice";
import { Button } from "../ui/button";
import axios from "axios";
import { Link } from "react-router-dom";

function HistoryVoucherTable() {
  const dispatch = useDispatch();
  const { voucherClaimed } = useSelector((state) => state.vouchers);
  // useEffect(() => {
  //   dispatch(getVouchersClaimed());
  // }, [dispatch]);
  //   console.log(voucherCountClaimed);

  // useEffect(() => {
  //   localStorage.setItem("historyDataLength", voucherClaimed.length);
  // }, [voucherClaimed]);

  const handleRemove = async (id) => {
    try {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      const response = await axios.post(
        "http://localhost:3000/api/voucher/remove",
        {
          id,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      //   console.log(response);

      if (response.status === 200) {
        dispatch(getVouchersClaimed());
        alert("Voucher berhasil dihapus!");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  // console.log(voucherClaimed.length);
  // localStorage.setItem("historyDataLength", voucherClaimed.length);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama</TableHead>
          <TableHead className="w-[120px] ">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {voucherClaimed.length === 0 ? (
          <TableRow>
            <TableCell>
              <div className="flex justify-center mt-20 text-lg font-semibold">
                Anda belum claim voucher
              </div>

              <Link to="/dashboard" className="flex justify-center mt-2">
                <Button>Claim voucher!</Button>
              </Link>
            </TableCell>
          </TableRow>
        ) : (
          <>
            {voucherClaimed.map((item, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex">
                    <img
                      src={`http://localhost:3000${item.voucher.foto}`}
                      alt={item.nama}
                      className="h-6"
                    />
                    <span className="ml-2">
                      {item.voucher.nama} - {item.voucher.kategori} voucher
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleRemove(item.id)}>Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </>
        )}
      </TableBody>
    </Table>
  );
}

export default HistoryVoucherTable;
