import { Button } from "@/components/ui/button";

interface DataPaginationProps {
    totalPages: number;
    page: number;
    onPageChange: (page: number) => void;
}

export const DataPagination = ({ totalPages, page, onPageChange }: DataPaginationProps) => {
    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                Page {page} of {totalPages || 1}
                <Button
                    disabled={page === totalPages || totalPages === 0}
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </Button>
                <Button
                    disabled={page === totalPages || totalPages === 0}
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </Button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{totalPages}</span> of{" "}
                        <span className="font-medium">{page}</span> results
                    </p>
                </div>
                <div>
                    <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                    >
                        <Button onClick={() => onPageChange(page - 1)}>Previous</Button>
                        <Button onClick={() => onPageChange(page + 1)}>Next</Button>
                    </nav>
                </div>
            </div>
        </div>
    )
}