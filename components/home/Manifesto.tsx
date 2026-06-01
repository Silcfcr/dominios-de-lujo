'use client';

import { useRef, useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './Manifesto.module.css';

export default function Manifesto() {
  const { t, lang } = useI18n();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioSrc = `/audio/manifesto-${lang}.mp3`;

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      el.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  const onTimeUpdate = () => {
    const el = audioRef.current;
    if (!el || !el.duration) return;
    setProgress((el.currentTime / el.duration) * 100);
  };

  const onLoadedMetadata = () => {
    const el = audioRef.current;
    if (el) setDuration(el.duration);
  };

  const onEnded = () => setPlaying(false);

  const onProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = audioRef.current;
    if (!el || !el.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    el.currentTime = (x / rect.width) * el.duration;
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <section className={`sec ${styles.section}`}>
      <div className={styles.inner}>
        <RevealWrapper className={styles.text}>
          <p className="s-eye lft">{t('manifesto.eyebrow')}</p>
          <h2 className={`s-title ${styles.title}`}>
            {t('manifesto.title')} <em>{t('manifesto.titleEm')}</em>
          </h2>
          <p className={styles.body}>{t('manifesto.body')}</p>
        </RevealWrapper>

        <RevealWrapper delay={1} className={styles.player}>
          <div className={styles.playerInner}>
            <button
              className={`${styles.playBtn} ${playing ? styles.playing : ''}`}
              onClick={toggle}
              aria-label={t('manifesto.playLabel')}
            >
              {playing ? (
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              )}
            </button>

            <div className={styles.playerRight}>
              <p className={styles.playerLabel}>{t('manifesto.playLabel')}</p>
              <div className={styles.progressWrap} onClick={onProgressClick} role="progressbar" aria-valuenow={progress}>
                <div className={styles.progressBg} />
                <div className={styles.progressFill} style={{ width: `${progress}%` }} />
              </div>
              {duration > 0 && (
                <p className={styles.time}>{fmt(audioRef.current?.currentTime ?? 0)} / {fmt(duration)}</p>
              )}
              {duration === 0 && (
                <p className={styles.comingSoon}>{t('manifesto.comingSoon')}</p>
              )}
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
        </RevealWrapper>
      </div>
    </section>
  );
}
