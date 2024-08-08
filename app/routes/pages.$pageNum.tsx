import {useState, useContext} from "react";
import {LoaderFunctionArgs} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import ThemeSelector from "../lib/themeSelector/ThemeSelector";
import {Provider} from "react-redux";
import SearchComponent from "../lib/search/SearchComponent";
import ResultsComponent from "../lib/result/ResultsComponent";
import {store} from "../store";
import {ThemeContext} from "../lib/context/ThemeContext";


export const loader = async ({params, request}: LoaderFunctionArgs) => {
    const page = params.pageNum ?? "1";

    const url = new URL(request.url);
    const name  = url.searchParams.get("name");

    return { pageNumber: page, name: (name ?? undefined) };
};


export default function Page() {
    const { pageNumber, name } = useLoaderData<typeof loader>();

    let page = parseInt(pageNumber);

    if (Number.isNaN(page)) {
        page = 1;
    }

    const [characterId, setCharacterId] = useState<number | null>(null);
    const { theme } = useContext(ThemeContext)!;

    //console.log('pageNumber=' + pageNumber + ',name=' + name);


    const handleChClick = (characterId: number) => {
        setCharacterId(characterId);
    };

    const throwError = () => {
        throw new Error('Test error');
    };

    return (
        <Provider store={store}>
             {/*<ErrorBoundaryRemix>*/}
                 <div className={`app-container ${theme}`} data-testid="app-component">
                     <ThemeSelector />
                     <div className="search-form">
                         <SearchComponent initialSearchTerm={name ? name : ''} />
                         <button onClick={throwError} type="button">Throw Error</button>
                     </div>
                     <ResultsComponent searchTerm={name} page={page} handleChClick={handleChClick} characterId={characterId} />
                 </div>
             {/*</ErrorBoundaryRemix>*/}
        </Provider>
    );
};
