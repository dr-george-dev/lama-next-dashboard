import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSeach from "@/components/TableSeach";
import { examsData, role, } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type Exam = {
    id: number;
    subject: string;
    class: number;
    teacher: number;
    date: string;
};

const columns = [
    {
        header: "Subject Name",
        accessor: "name",
    },
    {
        header: "Class",
        accessor: "class",
    },
    {
        header: "Teacher",
        accessor: "teacher",
        className: "hidden md:table-cell",
    },
    {
        header: "Date",
        accessor: "date",
        className: "hidden md:table-cell",
    },
    {
        header: "Actions",
        accessor: "action",
    },
];

const ExamListPage = () => {
    const renderRow = (item: Exam) => (
        <>
            <td className="flex items-center gap-4 p-4">{item.subject}</td>
            <td className="p-4">{item.class}</td>
            <td className="hidden md:table-cell p-4">{item.teacher}</td>
            <td className="hidden md:table-cell p-4">{item.date}</td>
            <td className="p-4">
                <div className="flex items-center gap-4">
                    <Link href={`/list/teachers/${item.id}`}>
                        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-drSkyLight">
                            <Image src="/edit.png" alt="" width={16} height={16} />
                        </button>
                    </Link>
                    <button className="ml-2 w-7 h-7 flex items-center justify-center rounded-full bg-drPurple">
                        <Image src="/delete.png" alt="" width={16} height={16} />
                    </button>
                </div>
            </td>
        </>
    );

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* TOP */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Exams </h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSeach />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-drYellow">
                            <Image src="/filter.png" alt="" width={14} height={14} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-drYellow">
                            <Image src="/sort.png" alt="" width={14} height={14} />
                        </button>
                        {role === "admin" && (
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-drYellow">
                                <Image src="/plus.png" alt="" width={14} height={14} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={examsData} />
            {/* PAGINATION */}
            <Pagination />
        </div>
    );
};

export default ExamListPage;

// FOR PARENTS LIST PAGE CHECK 2:10:00 OF THE VIDEO
