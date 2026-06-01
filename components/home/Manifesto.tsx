'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { assetPath } from '@/lib/assetPath';
import styles from './Manifesto.module.css';

export default function Manifesto() {
  const { t, lang } = useI18n();
  const audioRef  = useRef<HTMLAudioElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [playing, setPlaying]         = useState(false);
  const [progress, setProgress]       = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration]       = useState(0);
  const [visible, setVisible]         = useState(false);

  const audioSrc = assetPath(
    `/audio/${encodeURIComponent(lang === 'en' ? 'Manifiesto English.m4a' : 'Manifiesto Español.m4a')}`
  );

  // Reveal on scroll
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Reset when language switches
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.pause();
    el.load();
    setPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
  }, [lang]);

  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      el.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [playing]);

  const onTimeUpdate = () => {
    const el = audioRef.current;
    if (!el || !el.duration) return;
    setProgress((el.currentTime / el.duration) * 100);
    setCurrentTime(el.currentTime);
  };

  const onLoadedMetadata = () => {
    const el = audioRef.current;
    if (el) setDuration(el.duration);
  };

  const onEnded = () => {
    setPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  const onProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = audioRef.current;
    if (!el || !el.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    el.currentTime = ((e.clientX - rect.left) / rect.width) * el.duration;
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  return (
    <section ref={sectionRef} className={`${styles.section} ${visible ? styles.visible : ''}`}>
      <div className={styles.glow} />

      <div className={styles.inner}>
        <span className={styles.ornament}>❝</span>

        <p className={`s-eye ${styles.eyebrow}`}>{t('manifesto.eyebrow')}</p>

        <h2 className={styles.title}>
          {t('manifesto.title')}<br />
          <em>{t('manifesto.titleEm')}</em>
        </h2>

        <div className={styles.rule} />

        <p className={styles.body}>{t('manifesto.body')}</p>

        {/* Player */}
        <div className={styles.player}>
          <button
            className={`${styles.playBtn} ${playing ? styles.playActive : ''}`}
            onClick={toggle}
            aria-label={t('manifesto.playLabel')}
          >
            <span className={styles.ring} />
            {playing ? (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <polygon points="6,3 20,12 6,21" />
              </svg>
            )}
          </button>

          <div className={styles.playerBody}>
            <div className={styles.playerTop}>
              <div className={`${styles.wave} ${playing ? styles.waveOn : ''}`}>
                {[0,1,2,3,4].map(i => (
                  <span key={i} className={styles.bar} style={{ '--i': i } as React.CSSProperties} />
                ))}
              </div>
              <span className={styles.playerLabel}>{t('manifesto.playLabel')}</span>
            </div>

            <div className={styles.progressWrap} onClick={onProgressClick} role="progressbar" aria-valuenow={progress}>
              <div className={styles.progressBg} />
              <div className={styles.progressFill} style={{ width: `${progress}%` }}>
                <span className={styles.dot} />
              </div>
            </div>

            <p className={styles.time}>
              {duration > 0
                ? `${fmt(currentTime)} / ${fmt(duration)}`
                : t('manifesto.comingSoon')}
            </p>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
        preload="metadata"
      />
    </section>
  );
}
