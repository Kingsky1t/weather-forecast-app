import { Search } from "./Search";
import { Table } from "./Table";
import { SearchContextProvider } from "../context";

export const Home = () => {
    return (
        <SearchContextProvider>
            <div className='flex flex-col h-screen bg-gradient-to-br from-cyan-400 to-blue-700'>
                <Search></Search>
                <Table></Table>
            </div>
        </SearchContextProvider>
    );
};
