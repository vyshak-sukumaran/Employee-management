import Button from "@mui/material/Button";
export default function Error(props) {
  return (
    <div className="w-fit h-fit p-10 mx-auto border-2 border-red-500 flex flex-col items-center justify-center gap-5 rounded-md mt-10">
      <h1 className="text-3xl">
        {props?.error?.status ?? "Something went wrong"}
      </h1>
      <p>{props?.error?.message ?? "Error occurred in the component. Please try again."}</p>
      {props.refetchFn && (
        <Button
          variant="contained"
          color="error"
          onClick={() => props.refetchFn()}
        >
          Retry
        </Button>
      )}
    </div>
  );
}
