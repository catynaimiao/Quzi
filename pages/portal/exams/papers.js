import Link from "next/link";
import useSWR from "swr";
import { useEffect, useState } from "react";

const PapersView = () => {
  const { data, error } = useSWR("/api/exams/papers", fetcher);
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    if (data) {
      setPapers(data);
    }
  }, [data]);

  return (
    <div>
      <h1>Papers</h1>
      {error && <div>Failed to load</div>}
      {!error && !data && <div>Loading...</div>}
      {!error && data && (
        <div>
          {papers.map((paper) => (
            <div key={paper.id}>
              <Link href={`/portal/exams/papers/${paper.id}`}>
                <a>{paper.title}</a>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
