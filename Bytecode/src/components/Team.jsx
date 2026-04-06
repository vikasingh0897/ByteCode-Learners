import { useEffect, useState, useMemo } from 'react';
import { Terminal, Code, Zap, Cpu } from 'lucide-react';
import RoleCard from './RoleCard';

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL;

const Team = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchTeam = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/v1/team`);
        const result = await response.json();
        if (isMounted && result.success) setMembers(result.data);
      } catch (err) {
        console.error('UPLINK_FAILURE', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchTeam();
    return () => {
      isMounted = false;
    };
  }, []);

  const tiers = useMemo(() => {
    const sortByRole = (data, preferredOrder) => {
      return [...data].sort((a, b) => {
        const indexA = preferredOrder.indexOf(a.role);
        const indexB = preferredOrder.indexOf(b.role);
        return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? 99 : indexB);
      });
    };

    return {
      t1: sortByRole(
        members.filter((m) => m.category === 'tier1'),
        ['Team Lead', 'Co-Team Lead']
      ),
      t2: sortByRole(
        members.filter((m) => m.category === 'tier2'),
        ['Tech Lead', 'Co-Tech Lead']
      ),
      t3: members.filter((m) => m.category === 'tier3'),
      core: members.filter((m) => m.category === 'core'),
    };
  }, [members]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center font-mono text-primary animate-pulse">
        INIT_SYNC...
      </div>
    );

  return (
    <section
      id="team"
      className="py-24 px-4 md:px-8 bg-surface overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/4" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-2 mb-4">
            <Cpu size={16} className="text-primary" />
            <span className="text-primary font-mono tracking-[0.3em] text-[10px] uppercase">
              Command_Registry_v4.0
            </span>
          </div>
          <h2 className="font-headline text-5xl md:text-6xl font-bold tracking-tight text-white mb-2 uppercase">
            Team
          </h2>
          <div className="h-1 w-24 bg-primary shadow-[0_0_15px_rgba(80,255,105,0.5)]"></div>
        </div>

        <div className="space-y-12 md:space-y-16">
          <div className="flex flex-col gap-8 md:gap-10">
            <div className="grid grid-cols-2 gap-x-4 md:flex md:justify-center md:gap-32">
              {tiers.t1.map((p) => (
                <div key={p._id} className="flex justify-center">
                  <RoleCard person={p} icon={Terminal} color="primary" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-x-4 md:flex md:justify-center md:gap-32">
              {tiers.t2.map((p) => (
                <div key={p._id} className="flex justify-center">
                  <RoleCard person={p} icon={Code} color="secondary" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-12 gap-x-4 md:flex md:flex-wrap md:justify-center md:gap-x-16 md:gap-y-20">
            {tiers.t3.map((p) => (
              <div
                key={p._id}
                className="w-full md:w-[calc(25%-4rem)] flex justify-center"
              >
                <RoleCard person={p} icon={Zap} color="tier3" />
              </div>
            ))}
          </div>

          {/* CORE SECTION - Image Left, Info Right, Linked to LinkedIn */}
          <div className="mt-24 md:mt-32">
            <h3 className="text-center font-mono text-xs text-primary/40 tracking-[0.4em] uppercase mb-12">
              Core_Execution_Units
            </h3>
            <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory no-scrollbar gap-6 px-4 pb-12 md:flex-wrap md:justify-center md:overflow-visible">
              {tiers.core.map((m) => (
                <a
                  key={m._id}
                  href={m.socialLinks?.linkedin || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-[85%] sm:min-w-[320px] snap-center p-5 bg-zinc-900/40 border border-white/5 rounded-xl hover:border-primary/40 transition-all duration-300 group shrink-0 flex items-center gap-6"
                >
                  {/* Larger Image on the Left */}
                  <img
                    src={m.img}
                    alt={m.name}
                    loading="lazy"
                    className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover border border-white/10 transition-transform group-hover:scale-105"
                  />

                  {/* Info on the Right */}
                  <div className="text-left">
                    <h4 className="text-white font-bold text-base uppercase tracking-tight group-hover:text-primary transition-colors">
                      {m.name}
                    </h4>
                    <p className="text-primary/70 font-mono text-[10px] uppercase mt-1 tracking-wider">
                      {m.role}
                    </p>
                    <div className="mt-3 text-[9px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary/40 animate-pulse"></span>
                      View_Profile
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
