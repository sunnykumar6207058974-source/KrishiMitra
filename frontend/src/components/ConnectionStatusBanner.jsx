import React, { useState, useEffect } from 'react';
import { Server, Database, Monitor, RefreshCw, CheckCircle2, AlertCircle, Clock, ShieldCheck } from 'lucide-react';
import healthService from '../services/healthService';

export default function ConnectionStatusBanner() {
  const [status, setStatus] = useState({
    backend: { connected: false, data: null, error: null },
    database: { connected: false, data: null, error: null }
  });
  const [loading, setLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState(null);

  const checkStatus = async () => {
    setLoading(true);
    const result = await healthService.checkConnectionStatus();
    setStatus(result);
    setLastChecked(new Date().toLocaleTimeString());
    setLoading(false);
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h3 className="text-sm font-bold text-gray-900 tracking-tight">
            Phase 1: Environment & System Connection Status
          </h3>
          <span className="text-[10px] font-bold text-forest-800 bg-forest-50 border border-forest-200 px-2 py-0.5 rounded-full">
            Assam Target Focus
          </span>
        </div>

        <div className="flex items-center gap-3">
          {lastChecked && (
            <span className="text-[11px] text-gray-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Checked: {lastChecked}
            </span>
          )}
          <button
            onClick={checkStatus}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold border border-gray-200 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Testing...' : 'Test Connection'}</span>
          </button>
        </div>
      </div>

      {/* 3 Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* 1. Frontend */}
        <div className="p-3.5 rounded-xl border bg-emerald-50/60 border-emerald-200/80 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <Monitor className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold uppercase text-emerald-900 tracking-wider">Frontend Client</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-800">React + Vite Online</span>
            </div>
            <span className="text-[10px] text-emerald-700 block">Host: localhost:5173</span>
          </div>
        </div>

        {/* 2. Backend */}
        <div className={`p-3.5 rounded-xl border flex items-start gap-3 ${
          status.backend.connected
            ? 'bg-emerald-50/60 border-emerald-200/80'
            : 'bg-red-50/60 border-red-200/80'
        }`}>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
            status.backend.connected ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
          }`}>
            <Server className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${
              status.backend.connected ? 'text-emerald-900' : 'text-red-900'
            }`}>
              Backend API (FastAPI)
            </span>
            <div className="flex items-center gap-1.5">
              {status.backend.connected ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-800">
                    Connected ({status.backend.data?.latencyMs}ms)
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                  <span className="text-xs font-bold text-red-800">Disconnected</span>
                </>
              )}
            </div>
            <span className={`text-[10px] block ${
              status.backend.connected ? 'text-emerald-700' : 'text-red-700'
            }`}>
              {status.backend.connected
                ? `Version: ${status.backend.data?.version || '1.0.0'}`
                : (status.backend.error || 'Server offline')}
            </span>
          </div>
        </div>

        {/* 3. Database */}
        <div className={`p-3.5 rounded-xl border flex items-start gap-3 ${
          status.database.connected
            ? 'bg-emerald-50/60 border-emerald-200/80'
            : 'bg-amber-50/60 border-amber-200/80'
        }`}>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
            status.database.connected ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
          }`}>
            <Database className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${
              status.database.connected ? 'text-emerald-900' : 'text-amber-900'
            }`}>
              Database (SQLAlchemy)
            </span>
            <div className="flex items-center gap-1.5">
              {status.database.connected ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-800">
                    Connected ({status.database.data?.engine?.toUpperCase()})
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span className="text-xs font-bold text-amber-800">Connection Pending</span>
                </>
              )}
            </div>
            <span className={`text-[10px] block ${
              status.database.connected ? 'text-emerald-700' : 'text-amber-700'
            }`}>
              {status.database.connected
                ? `Latency: ${status.database.data?.latency_ms}ms`
                : (status.database.error || 'Check DATABASE_URL')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
