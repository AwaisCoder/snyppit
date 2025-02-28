import { UserResource } from "@clerk/types";
import { Clock, Code, ChevronRight, ListVideo, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProfileHeaderProps {
  user: UserResource;
  userStats: any;
  userData: any;
}

const STATS = [
  {
    label: "Code Executions",
    value: 120,
    icon: ListVideo,
    color: "from-blue-500 to-purple-500",
    description: "Total number of code executions",
    metric: {
      label: "+10% last week",
      value: "12",
      icon: ChevronRight,
    },
  },
  {
    label: "Public Snippets",
    value: 30,
    icon: Code,
    color: "from-green-500 to-teal-500",
    description: "Total number of public snippets",
    metric: {
      label: "+5% last week",
      value: "2",
      icon: ChevronRight,
    },
  },
  {
    label: "Starred Snippets",
    value: 5,
    icon: Star,
    color: "from-orange-500 to-yellow-500",
    description: "Total number of starred snippets",
    metric: {
      label: "+20% last week",
      value: "1",
      icon: ChevronRight,
    },
  },
];

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, userStats, userData }) => {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [isEmailVisible, setEmailVisible] = useState(false);

  const handleEmailClick = () => {
    if (user.emailAddresses[0]?.emailAddress) {
      navigator.clipboard.writeText(user.emailAddresses[0].emailAddress);
      alert("Email copied to clipboard!");
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-purple-800 rounded-xl blur opacity-20" />
      <div className="relative p-6 bg-black/30 rounded-xl border border-gray-800/50 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Image
              src={user.imageUrl || "/snyppitlogo.png"}
              alt="Profile"
              className="rounded-full w-20 h-20"
              width={80}
              height={80}
            />
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white">{user.firstName} {user.lastName}</h2>
              <div className="flex items-center gap-2">
                <span
                  className="text-gray-400 hover:text-gray-300 cursor-pointer relative group"
                  onMouseEnter={() => setEmailVisible(true)}
                  onMouseLeave={() => setEmailVisible(false)}
                  onClick={handleEmailClick}
                >
                  {isEmailVisible ? user.emailAddresses[0]?.emailAddress : "Show Email"}
                  <AnimatePresence>
                    {isEmailVisible && (
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 top-full mt-1 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-md"
                      >
                        Click to Copy
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                {userData?.isPro && (
                  <span className="px-2 py-1 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 text-black text-xs font-bold">
                    PRO
                  </span>
                )}
              </div>
            </div>
          </div>
          <Link href="/pricing">
            <button className="px-4 py-2 rounded-md bg-gradient-to-br from-blue-500 to-purple-500 text-white">
              Upgrade to Pro
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {STATS.map((stat, index) => (
            <motion.div
              key={index}
              className="relative rounded-2xl overflow-hidden group hover:shadow-lg hover:shadow-blue-500/50 transition-shadow duration-300"
              onMouseEnter={() => setHoveredStat(index)}
              onMouseLeave={() => setHoveredStat(null)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute inset-0 bg-black/30 border border-gray-800/50 backdrop-blur-sm" />
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
              <div className="relative p-6 flex flex-col items-center justify-center">
                <div className={`p-4 mb-3 rounded-full bg-gradient-to-br ${stat.color} bg-opacity-10`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-2xl font-semibold text-white">{typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}</h4>
                <p className="text-sm text-gray-400 text-center">{stat.label}</p>
              </div>

              {/* Hover breakdown */}
              <AnimatePresence>
                {hoveredStat === index && (
                  <motion.div
                    className="absolute inset-0 bg-black/90 backdrop-blur-md p-6 flex flex-col"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-1">
                        <h4 className="text-lg font-semibold text-white">{stat.label}</h4>
                        <p className="text-gray-400">{stat.description}</p>
                      </div>
                      <div className={`p-2 rounded-md bg-gradient-to-br ${stat.color} bg-opacity-10`}>
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {stat.metric && (
                      <div className="flex items-center justify-between text-gray-400 mb-2">
                        <span className="flex items-center gap-1">
                          <stat.metric.icon className="w-4 h-4 text-gray-500" />
                          {stat.metric.label}
                        </span>
                        <span className="font-medium text-white">{stat.metric.value}</span>
                      </div>
                    )}

                    {hoveredStat === 0 && (
                      <div className="mt-4">
                        <div className="w-full h-10 bg-gray-700 rounded-md" />
                        <p className="text-xs text-gray-500 mt-1 text-center">Trend over last 24h</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
