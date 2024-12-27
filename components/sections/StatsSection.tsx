import { LeetCode } from "leetcode-query";
import { Stats } from "types";

export default async function StatsSection() {
  const leetcode = new LeetCode();
  const user = await leetcode.user("yvjnlee");
  
  const stats: Stats = {
    recentSubmissionList: user.recentSubmissionList,
    submitStats: user.matchedUser?.submitStats.acSubmissionNum || [],
    ranking: user.matchedUser?.profile.ranking || 0,
  };

  return (
    <div className="mb-4 shadow-sm rounded-lg">
      <h2 className="text-xl font-bold mb-3">Stats 📊</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Ranking */}
        <div className="flex flex-col">
          <h3 className="text-md font-bold mb-2">Leetcode Stats</h3>
          <ul className="space-y-2">
            <li className="text-sm flex items-center">
                <span className="mr-2 truncate w-3/4">Leetcode Ranking:</span>
                <span className="mr-2">#{stats.ranking}</span>
            </li>
            {stats.submitStats.map((stat, index) => (
              <li key={index} className="text-sm flex items-center">
                <span className="mr-2 truncate w-3/4">{stat.difficulty}</span>
                <span className="mr-2">{stat.count}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Submissions */}
        <div className="flex flex-col">
          <h3 className="text-md font-bold mb-2">Last 5 Submissions</h3>
          <ul className="space-y-2">
            {stats.recentSubmissionList?.slice(0, 5).map((submission, index) => (
              <li key={index} className="text-sm flex items-center">
                <span className="mr-2 truncate w-3/4">{submission.title}</span>
                <span className="mr-2">
                  {submission.statusDisplay === 'Accepted' ? '✅' : '❌'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}