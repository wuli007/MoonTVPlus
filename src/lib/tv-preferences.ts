export type TVPlayerUpDownAction = 'wake-menu' | 'volume';

export const TV_PLAYER_UP_DOWN_ACTION_KEY = 'tv_player_up_down_action';
export const DEFAULT_TV_PLAYER_UP_DOWN_ACTION: TVPlayerUpDownAction =
  'wake-menu';

export function normalizeTVPlayerUpDownAction(
  value: unknown
): TVPlayerUpDownAction {
  return value === 'volume' ? 'volume' : DEFAULT_TV_PLAYER_UP_DOWN_ACTION;
}

export function loadTVPlayerUpDownAction(): TVPlayerUpDownAction {
  if (typeof window === 'undefined') return DEFAULT_TV_PLAYER_UP_DOWN_ACTION;

  try {
    return normalizeTVPlayerUpDownAction(
      localStorage.getItem(TV_PLAYER_UP_DOWN_ACTION_KEY)
    );
  } catch {
    return DEFAULT_TV_PLAYER_UP_DOWN_ACTION;
  }
}

export function saveTVPlayerUpDownAction(action: TVPlayerUpDownAction): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(TV_PLAYER_UP_DOWN_ACTION_KEY, action);
  } catch {
    // ignore localStorage failures in private/limited modes
  }
}

// --- 快进/快退步长设置 ---

export const SEEK_STEP_KEY = 'tv_player_seek_step';
export const DEFAULT_SEEK_STEP = 10;

export const VALID_SEEK_STEPS = [5, 10, 15, 30, 60] as const;
export type SeekStep = (typeof VALID_SEEK_STEPS)[number];

export function normalizeSeekStep(value: unknown): SeekStep {
  const num = typeof value === 'number' ? value : Number(value);
  return (VALID_SEEK_STEPS as readonly number[]).includes(num)
    ? (num as SeekStep)
    : DEFAULT_SEEK_STEP;
}

export function loadSeekStep(): SeekStep {
  if (typeof window === 'undefined') return DEFAULT_SEEK_STEP;

  try {
    return normalizeSeekStep(localStorage.getItem(SEEK_STEP_KEY));
  } catch {
    return DEFAULT_SEEK_STEP;
  }
}

export function saveSeekStep(step: SeekStep): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(SEEK_STEP_KEY, String(step));
  } catch {
    // ignore localStorage failures in private/limited modes
  }
}
