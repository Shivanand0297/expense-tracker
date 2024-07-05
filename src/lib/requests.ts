import api from "@/lib/axiosInstance";
import { PaginationState } from "@tanstack/react-table";

export const getExpensesApi = ({ pageIndex, pageSize }: PaginationState) => {
  return api.get("/expenses", {
    params: {
      _page: pageIndex,
      _per_page: pageSize,
    },
  });
};

export const getIncomeApi = ({ pageIndex, pageSize }: PaginationState) => {
  return api.get("/income", {
    params: {
      _page: pageIndex,
      _per_page: pageSize,
    },
  });
};
