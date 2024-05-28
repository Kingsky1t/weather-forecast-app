import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { SearchContext } from "../Context/SearchContext";

const TABLE_HEAD = ["CITY", "COUNTRY", "TIME ZONE"];

export function Table() {
  const { searchedCities } = useContext(SearchContext);
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [index, setIndex] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    axios
      .get(
        `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?order_by=name&limit=20&offset=${
          index * 2
        }0`
      )
      .then((res) => {
        setCities((prev) => [...prev, ...res.data.results]);
        res.data.results.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => console.error(err));
    setIndex((prev) => prev + 1);
  };

  useEffect(() => {
    if (searchedCities && searchedCities.length > 0) {
      setCities(searchedCities);
      setHasMore(false);
    } else {
      axios
        .get(
          "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?order_by=name&limit=20"
        )
        .then((res) => {
          setCities(res.data.results);
          setHasMore(true);
        })
        .catch((err) => console.error(err));
    }
  }, [searchedCities]);

  return (
    <div className="relative w-4/5 h-3/4 mx-auto my-4 ">
      <div className="grid grid-cols-3 bg-sky-500 shadow-xl text-white rounded py-4">
        {TABLE_HEAD.map((head) => (
          <div key={head}>
            <p className="-ml-4 font-bold  text-xl text-center">
              {head}
            </p>
          </div>
        ))}
      </div>
      <div className="scrollbar h-full overflow-y-auto " id="scrollableDiv">
        <InfiniteScroll
          dataLength={cities.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {cities.map((item) => (
            <div
              key={item.geoname_id}
              className="grid grid-cols-3 py-1  p-1 my-2"
            >
              <p
                className="rounded text-xl bg-white p-2 m-1 text-center cursor-pointer hover:bg-sky-700 hover:text-white transition-colors"
                onClick={() => {
                  navigate("/weather", {
                    state: { ...item.coordinates, name: item.name },
                  });
                }}
              >
                {item.name}
              </p>
              <p className="rounded text-xl bg-white p-2 m-1 text-center">
                {item.cou_name_en}
              </p>
              <p className="rounded text-xl bg-white p-2 m-1 text-center">
                {item.timezone}
              </p>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
