import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing-background min-h-screen text-slate-900 flex flex-col">
      <header className="w-full border-b border-white/25 bg-white/80 text-center shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-bold">Expense Tracker</h1>
          <div className="space-x-3">
            <Link className="text-sm font-medium text-slate-700 hover:text-slate-900" to="/login">Login</Link>
            <Link className="text-sm font-medium text-slate-700 hover:text-slate-900" to="/register">Register</Link>
          </div>
        </div>
      </header>

      <main className="mx-auto flex flex-1 w-full max-w-2xl flex-col items-center justify-center gap-6 px-4 py-8">
        <section className="w-full space-y-4 text-center">
          <h2 className="text-5xl font-bold">About</h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-700">
            Expense Tracker is a web application that helps users manage their daily
            income and expenses efficiently. It provides a simple interface to track
            financial activities and analyze spending habits.
          </p>
        </section>

        
 

        <section className="w-full rounded-xl border border-slate-200 bg-white/60 p-5 text-left shadow-sm">
          <h2 className="text-sm font-medium uppercase tracking-widest text-slate-500">Main Features</h2>
          <ul className="mt-3 space-y-1 text-sm text-slate-600">
            <li>- Add and edit transactions quickly</li>
            <li>- View income and expense summaries</li>
            <li>- Basic charts for trend analysis</li>
          </ul>
        </section>

        <section className="w-full space-y-3 text-center">
          <p className="text-purple-500 font-semibold uppercase tracking-widest">How It Works</p>
          <h2 className="text-4xl font-bold">Add Your All Daily Expenses</h2>
          <p className="mx-auto max-w-2xl text-sm text-slate-600">
            Nullam porta consectetur metus vel facilisis. Aliquam quis molestie massa,
            ut fringilla odio. Sed blandit quis ante ut feugiat.
          </p>
        </section>

        <section className="w-full grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 p-6 text-white shadow-lg">
            <div className="mb-4 h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-xl">👤</div>
            <h3 className="text-xl font-semibold">Create Account</h3>
            <p className="mt-2 text-sm text-slate-600">
              Sign up quickly and securely to start tracking all your expenses in one place.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-lg">
            <div className="mb-4 h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl">➕</div>
            <h3 className="text-xl font-semibold">Add Daily Expenses</h3>
            <p className="mt-2 text-sm text-slate-600">
              Add income and expense entries and get clear breakdowns automatically.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-lg">
            <div className="mb-4 h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-2xl">💰</div>
            <h3 className="text-xl font-semibold">Create Budget</h3>
            <p className="mt-2 text-sm text-slate-600">
              Set budget limits and get alerts to maintain better spending habits.
            </p>
          </div>
        </section>

        
      </main>

      <footer className="w-full border-t border-slate-200 bg-white/80 text-center py-4 text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
