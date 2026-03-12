import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

function createSnackbarStore() {
  const { subscribe, update } = writable([]);

  function enqueueSnackbar(message, severity = 'info', opts = {}) {
    const id = uuidv4();
    const now = Date.now();
    update(snackbars => {
      if (opts.dedupeKey) {
        const recent = snackbars.find(
          s => s.dedupeKey === opts.dedupeKey && now - s.time < 300,
        );
        if (recent) return snackbars;
      }
      return [...snackbars, { id, message, severity, dedupeKey: opts.dedupeKey, time: now }];
    });
    setTimeout(() => closeSnackbar(id), 3000);
  }

  function closeSnackbar(id) {
    update(snackbars => snackbars.filter(s => s.id !== id));
  }

  return { subscribe, enqueueSnackbar, closeSnackbar };
}

export const snackbarStore = createSnackbarStore();
