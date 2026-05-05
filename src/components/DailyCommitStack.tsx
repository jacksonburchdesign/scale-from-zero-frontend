import { useState } from 'react';
import { CaretDown, CaretUp, Sparkle, CircleNotch, GithubLogo } from '@phosphor-icons/react';

interface RawCommit {
  id: string;
  rawCommit: string;
  sourceRepo?: string;
  createdAt: any;
}

interface DailyCommitStackProps {
  dateString: string;
  commits: RawCommit[];
  onGenerate: (changelogIds: string[]) => Promise<void>;
}

export default function DailyCommitStack({ dateString, commits, onGenerate }: DailyCommitStackProps) {
  const [expanded, setExpanded] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const ids = commits.map(c => c.id);
      await onGenerate(ids);
    } catch (error) {
      console.error("Failed to generate changelog:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Stack effect UI classes
  const getStackClasses = (index: number) => {
    if (expanded) return "relative w-full transition-all duration-300 transform translate-y-0 scale-100 z-10 mb-3";
    
    // Collapsed stack effect (limit to showing top 3 visually)
    if (index === 0) return "relative w-full z-30 transition-all duration-300 transform translate-y-0 scale-100";
    if (index === 1) return "absolute top-0 left-0 w-full z-20 transition-all duration-300 transform translate-y-2 scale-[0.98] opacity-80 pointer-events-none";
    if (index === 2) return "absolute top-0 left-0 w-full z-10 transition-all duration-300 transform translate-y-4 scale-[0.96] opacity-60 pointer-events-none";
    
    return "hidden"; // Hide anything deeper than 3 layers in collapsed state
  };

  return (
    <div className="mb-10 relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-zinc-50 font-bold text-lg">{dateString}</h3>
        <div className="flex items-center gap-3">
          <span className="text-sm text-zinc-400 font-medium bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
            {commits.length} Commit{commits.length !== 1 ? 's' : ''}
          </span>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-hover)] text-zinc-50 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all disabled:opacity-70"
          >
            {isGenerating ? (
              <CircleNotch size={16} className="animate-spin" weight="bold" />
            ) : (
              <Sparkle size={16} weight="fill" />
            )}
            Generate Changelog
          </button>
        </div>
      </div>

      <div className="relative">
        <div className={expanded ? "space-y-0" : "relative"}>
          {commits.map((commit, i) => (
            <div 
              key={commit.id} 
              className={`${getStackClasses(i)} bg-zinc-900/60 backdrop-blur-md border border-zinc-800/80 rounded-xl p-4 shadow-lg`}
            >
              <div className="flex gap-3">
                <div className="mt-1 flex-shrink-0">
                  <GithubLogo size={20} weight="duotone" className="text-zinc-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                      {commit.sourceRepo || 'repository'}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {commit.createdAt?.toDate ? commit.createdAt.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                    </span>
                  </div>
                  <div className="text-sm text-zinc-300 font-mono whitespace-pre-wrap leading-relaxed mt-2">
                    {commit.rawCommit}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {commits.length > 1 && (
          <div className={`flex justify-center ${expanded ? 'mt-4' : 'absolute -bottom-8 left-0 right-0 z-40'}`}>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-50 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 px-4 py-1.5 rounded-full transition-all shadow-xl"
            >
              {expanded ? (
                <>Collapse Stack <CaretUp weight="bold" /></>
              ) : (
                <>Expand All Commits <CaretDown weight="bold" /></>
              )}
            </button>
          </div>
        )}
      </div>
      
      {/* Spacer for collapsed state so content below doesn't overlap the absolute positioned cards */}
      {!expanded && commits.length > 1 && <div className="h-10"></div>}
    </div>
  );
}
