import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";

import TopBanner from "../../../../client/components/global/TopBanner";
import { ActiveLink } from "../../../../client/configs/navs";

const TagInput = ({ label, disabled }) => {
  const [tags, setTags] = useState([]);
  const [options, setOptions] = useState([
    "Tag1",
    "Tag2",
    "Tag3",
    "Tag4",
    "Tag5",
  ]);

  const handleInputChange = (event, value) => {
    setTags(value);
    console.log("value", value.join(","));
  };

  const handleDelete = (chipToDelete) => () => {
    setTags((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  return (
    <Autocomplete
      multiple
      options={options}
      value={tags}
      onChange={handleInputChange}
      freeSolo
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            key={option}
            variant='outlined'
            label={option}
            onDelete={handleDelete(option)}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} variant='outlined' label={label} />
      )}
    />
  );
};

const Main = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [paper, setPaper] = useState(null);

  useEffect(() => {
    const run = async () => {
      const { token } = await JSON.parse(localStorage.getItem("auth"));
      axios
        .get(`/api/v1/papers/paper/${pid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setPaper(res.data.data);
        });
    };
    if (pid) {
      run();
    }
  }, [pid]);

  if (!paper) return null;

  console.log(paper);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "题目",
      width: 300,
    },
    {
      field: "type",
      headerName: "类型",
      type: "number",
      width: 110,
    },
  ];

  const rows = paper.questions.map((q, i) => ({
    id: i + 1,
    name: q.name,
    type: q.options.length > 1 ? "多选题" : "单选题",
  }));

  return (
    <div className='mx-auto md:container'>
      <div className='grid h-[600px] grid-cols-12 gap-4'>
        <div className='col-span-8 row-span-4 overflow-scroll'>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </div>
        <div className='col-span-4 row-span-2 rounded border'>
          <div className='full'>
            <form className='flex flex-col space-y-2 p-4'>
              <TextField fullWidth label='考试名称' variant='outlined' />
              <TagInput label='考试分类' />
            </form>
          </div>
        </div>
        <div className='col-span-4 row-span-2 rounded border bg-primary-50'></div>
      </div>
    </div>
  );
};

const PaperView = () => {
  return (
    <div>
      <TopBanner title='考试管理' links={ActiveLink("Admin")} />
      <Main />
    </div>
  );
};

export default PaperView;
