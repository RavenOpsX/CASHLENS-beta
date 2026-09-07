import { TrendingUp, Plus } from 'lucide-react';

export default function EmptyState({ onAction }: { onAction: () => void }) {
  return (
    <div className="bg-white p-12 rounded-[3rem] border border-slate-100 flex flex-col items-center justify-center text-center space-y-6">
      <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center">
        <TrendingUp size={40} />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-slate-900 italic">The lens is blurry...</h3>
        <p className="text-slate-500 max-w-sm mx-auto mt-2">Log your first income or expense to focus your financial awareness.</p>
      </div>
      <button 
        onClick={onAction}
        className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-100 hover:scale-105 transition-all"
      >
        Add First Transaction
      </button>
    </div>
  );
}