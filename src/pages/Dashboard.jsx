import React from 'react';
import { Link } from 'react-router-dom';
import {
  Terminal, Film, Hash, Thermometer, ArrowRight,
  Github, Linkedin, MapPin, Briefcase, ExternalLink
} from 'lucide-react';

/* ── Tool definitions ── */
const tools = [
  {
    path: '/chatbot',
    icon: <Terminal size={22} />,
    iconBg: '#DCFCE7', iconColor: '#16A34A',
    tag: 'AI', tagColor: '#16A34A', tagBg: '#DCFCE7',
    name: 'AI Chatbot',
    desc: 'Conversational AI powered by Llama 3.3. Maintains session history with context-aware replies.',
    stack: ['React', 'Groq API', 'Llama 3.3'],
  },
  {
    path: '/movies',
    icon: <Film size={22} />,
    iconBg: '#EDE9FE', iconColor: '#7C3AED',
    tag: 'ML', tagColor: '#7C3AED', tagBg: '#EDE9FE',
    name: 'Movie Recommender',
    desc: 'Content-based engine using TF-IDF & cosine similarity across 4,800+ films.',
    stack: ['TF-IDF', 'Cosine Similarity', 'React'],
  },
  {
    path: '/tictactoe',
    icon: <Hash size={22} />,
    iconBg: '#FEF3C7', iconColor: '#D97706',
    tag: 'Algorithm', tagColor: '#D97706', tagBg: '#FEF3C7',
    name: 'Tic Tac Toe AI',
    desc: 'Unbeatable AI opponent using the Minimax algorithm with three difficulty levels.',
    stack: ['Minimax', 'Game Theory', 'React'],
  },
  {
    path: '/temperature',
    icon: <Thermometer size={22} />,
    iconBg: '#FEE2E2', iconColor: '#DC2626',
    tag: 'Utility', tagColor: '#DC2626', tagBg: '#FEE2E2',
    name: 'Temperature Converter',
    desc: 'Real-time conversion between Celsius, Fahrenheit, and Kelvin with live sync.',
    stack: ['React', 'Real-time', 'Math'],
  },
];

/* ── Stats ── */
const stats = [
  { value: '4',    label: 'Tools Built' },
  { value: '3+',   label: 'Tech Stacks' },
  { value: 'AI',   label: 'Powered' },
  { value: '2024', label: 'Internship' },
];

/* ── Skills ── */
const skillGroups = [
  {
    label: 'Languages',
    color: '#16A34A', bg: '#DCFCE7',
    skills: ['JavaScript', 'Python', 'C'],
  },
  {
    label: 'Frontend',
    color: '#7C3AED', bg: '#EDE9FE',
    skills: ['React', 'Vite', 'CSS'],
  },
  {
    label: 'AI / ML',
    color: '#0369A1', bg: '#E0F2FE',
    skills: ['LLM APIs', 'TF-IDF', 'Cosine Similarity'],
  },
  {
    label: 'Algorithms',
    color: '#D97706', bg: '#FEF3C7',
    skills: ['Minimax', 'Recursion', 'Search'],
  },
];

export default function Dashboard() {
  return (
    <div className="dashboard-page">

      {/* ── Profile / Bio card ── */}
      <div className="dash-profile-card">
        <div className="dash-profile-left">
          <div className="dash-avatar">MA</div>
          <div className="dash-profile-info">
            <h2 className="dash-profile-name">Mosin Ali</h2>
            <div className="dash-profile-role">
              <Briefcase size={13} />
              Software Developer · CodSoft Intern
            </div>
            <div className="dash-profile-location">
              <MapPin size={13} />
              India
            </div>
          </div>
        </div>
        <div className="dash-profile-right">
          <p className="dash-profile-bio">
            Built four production-ready web tools during the CodSoft internship — spanning
            AI chatbots, machine learning recommendation engines, game AI, and utility apps.
            Each project is fully interactive and deployed.
          </p>
          <div className="dash-profile-links">
            <a
              href="https://github.com/Mosinali10/codsoft"
              target="_blank"
              rel="noreferrer"
              className="dash-profile-link"
            >
              <Github size={15} /> GitHub Repo
              <ExternalLink size={11} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="dash-profile-link dash-profile-link-secondary"
            >
              <Linkedin size={15} /> LinkedIn
              <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="dash-hero">
        <h1 className="dash-hero-title">
          All internship projects<br />
          <span className="dash-hero-accent">in one place</span>
        </h1>
        <p className="dash-hero-sub">
          Four interactive web tools showcasing AI, machine learning,
          game algorithms, and real-time utilities — built with React + Vite.
        </p>
      </div>

      {/* ── Stats ── */}
      <div className="dash-stats">
        {stats.map((s) => (
          <div key={s.label} className="dash-stat-card">
            <span className="dash-stat-value">{s.value}</span>
            <span className="dash-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Skills ── */}
      <div className="dash-section-header" style={{ marginTop: '0.5rem' }}>
        <div>
          <h2 className="dash-section-title">Skills Demonstrated</h2>
          <p className="dash-section-sub">Technologies used across all projects</p>
        </div>
      </div>

      <div className="dash-skills-grid">
        {skillGroups.map((group) => (
          <div key={group.label} className="dash-skill-group">
            <div
              className="dash-skill-group-label"
              style={{ color: group.color, background: group.bg }}
            >
              {group.label}
            </div>
            <div className="dash-skill-chips">
              {group.skills.map((s) => (
                <span key={s} className="dash-skill-chip">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Tools ── */}
      <div className="dash-section-header" style={{ marginTop: '1.5rem' }}>
        <div>
          <h2 className="dash-section-title">Available Tools</h2>
          <p className="dash-section-sub">Click any card to open the tool</p>
        </div>
        <span className="dash-tool-count">{tools.length} tools</span>
      </div>

      <div className="dash-tools-grid">
        {tools.map((tool) => (
          <Link key={tool.path} to={tool.path} className="dash-tool-card">
            <div className="dash-tool-top">
              <div className="dash-tool-icon" style={{ background: tool.iconBg, color: tool.iconColor }}>
                {tool.icon}
              </div>
              <span className="dash-tool-tag" style={{ background: tool.tagBg, color: tool.tagColor }}>
                {tool.tag}
              </span>
            </div>
            <h3 className="dash-tool-name">{tool.name}</h3>
            <p className="dash-tool-desc">{tool.desc}</p>

            {/* Tech stack chips */}
            <div className="dash-tool-stack">
              {tool.stack.map((t) => (
                <span key={t} className="dash-stack-chip">{t}</span>
              ))}
            </div>

            <div className="dash-tool-cta">
              Open tool <ArrowRight size={14} />
            </div>
          </Link>
        ))}
      </div>

      {/* ── Footer note ── */}
      <p className="dash-footer-note">
        Built with React · Vite · Groq API · Deployed on Vercel ·{' '}
        <a href="https://github.com/Mosinali10/codsoft" target="_blank" rel="noreferrer">
          View source on GitHub
        </a>
      </p>

    </div>
  );
}
