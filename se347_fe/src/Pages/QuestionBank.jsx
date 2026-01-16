import {
  useDeleteQuestionFromBank,
  useGetMyQuestionBank,
} from "@/api/data_hooks/questionBankHook";
import { QuestionFormDialog } from "@/components/project_components/questionFormDialog";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import toastHelper from "@/helper/toastHelper";

import LoadingOverlay from "@/ui/LoadingOverlay";
import { Plus, Eye, Trash2, Search } from "lucide-react";
import { useEffect, useState } from "react";

function QuestionBank() {
  const [searchParams, setSearchParams] = useState({
    keyword: "",
    category: "",
  });

  const [searchParamsTrigger, setSearchParamsTrigger] = useState(searchParams);
  const [showQuestionForm, setShowQuestionForm] = useState(false);

  function handleOnChangeSearchParams(e) {
    setSearchParams(function (p) {
      return {
        ...p,
        [e.target.name]: e.target.value,
      };
    });
  }

  const deleteQuestionFromBank = useDeleteQuestionFromBank();
  useEffect(
    function () {
      if (deleteQuestionFromBank.isSuccess) {
        toastHelper.success("Xóa câu hỏi khỏi ngân hàng thành công!");
        getQuestionBank.refetch();
      }
      if (deleteQuestionFromBank.isError) {
        toastHelper.error(deleteQuestionFromBank.error.message);
      }
    },
    [
      deleteQuestionFromBank.isError,
      deleteQuestionFromBank.isSuccess,
      deleteQuestionFromBank.data,
    ]
  );

  function handleOnDeleteQuestion(questionId) {
    deleteQuestionFromBank.mutate({ questionId });
  }

  const getQuestionBank = useGetMyQuestionBank(
    searchParamsTrigger.keyword,
    searchParamsTrigger.category
  );

  useEffect(
    function () {
      if (getQuestionBank.isSuccess) {
        console.log(getQuestionBank.data);
      }
      if (getQuestionBank.isError) {
        toastHelper.error(getQuestionBank.error.message);
      }
    },
    [getQuestionBank.isSuccess, getQuestionBank.isError, getQuestionBank.data]
  );

  return (
    <div className="space-y-6">
      <QuestionFormDialog
        isOpen={showQuestionForm}
        onClose={() => {
          setShowQuestionForm(false);
        }}
        editingQuestion={""}
      />

      {getQuestionBank.isLoading && <LoadingOverlay />}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Ngân hàng câu hỏi</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý tất cả câu hỏi của bạn
          </p>
        </div>

        {true && (
          <div className="flex space-x-2.5">
            <Button
              className="bg-primary hover:bg-primary/70"
              onClick={() => setShowQuestionForm(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Thêm câu hỏi mới
            </Button>
          </div>
        )}
      </div>

      <div className="flex space-x-2.5">
        <div className="relative w-[30%]">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-black/50 pointer-events-none" />

          <Input
            type="text"
            name="keyword"
            value={searchParams.keyword}
            onChange={handleOnChangeSearchParams}
            placeholder="Tìm theo từ khóa"
            className="pl-8 border-2 border-black/20 focus:border-accent-foreground focus:ring-0 focus:outline-none"
          />
        </div>

        <div className="relative w-[30%]">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-black/50 pointer-events-none" />

          <Input
            type="text"
            name="category"
            value={searchParams.category}
            onChange={handleOnChangeSearchParams}
            placeholder="Tìm theo danh mục"
            className="pl-8 border-2 border-black/20 focus:border-accent-foreground focus:ring-0 focus:outline-none"
          />
        </div>

        <Button
          className="bg-primary hover:bg-primary/70"
          onClick={() => setSearchParamsTrigger(searchParams)}
        >
          <Search className="w-4 h-4 mr-2" />
          Tìm kiếm
        </Button>
      </div>

      {true ? (
        false ? (
          <div>Error</div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Danh sách các câu hỏi</CardTitle>
              <CardDescription>
                Tổng cộng {getQuestionBank?.data?.length ?? 0} câu hỏi
              </CardDescription>
            </CardHeader>

            <CardContent>
              {(getQuestionBank?.data?.length ?? 0) === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    Chưa có câu hỏi nào
                  </p>
                  <Button onClick={() => navigate("/quizzes/create")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm câu hỏi đầu tiên
                  </Button>
                </div>
              ) : (
                <div className="rounded-xl overflow-hidden">
                  <Table className="border-collapse border-spacing-y-2">
                    <TableHeader className="bg-accent-foreground">
                      <TableRow className="border-b-4 border-white">
                        <TableHead className="text-white w-[70%] max-w-[800px]">
                          Câu hỏi
                        </TableHead>
                        <TableHead className="text-white w-[20%] text-center">
                          Danh mục
                        </TableHead>

                        <TableHead className="text-white text-center w-[5%]">
                          Hành động
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {getQuestionBank?.data?.map((question, index) => {
                        return (
                          <TableRow
                            key={index}
                            className="border-b-4 border-white bg-black/10"
                          >
                            <TableCell className="font-medium overflow-hidden whitespace-nowrap text-ellipsis">
                              {question.content}
                            </TableCell>
                            <TableCell className="text-center">
                              {question.category}
                            </TableCell>

                            <TableCell className="text-center">
                              <div className="flex items-center justify-center gap-0">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={function () {
                                    alert("Xem chi tiết");
                                  }}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>

                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleOnDeleteQuestion(question.id)
                                  }
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        )
      ) : (
        <Card className="max-w-2xl mx-auto">
          <CardContent className="space-y-6">
            <div className="space-y-4">
              Vui lòng đăng nhập để sử dụng tính năng này.
            </div>

            <Button
              variant="destructive"
              onClick={() => navigate("/login")}
              className="w-full mt-2 bg-accent-foreground hover:bg-accent-foreground/70 text-white"
            >
              Đăng nhập
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default QuestionBank;
