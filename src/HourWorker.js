class HourWorker {
  static LIMIT_LENGTH = 5;
  static SHORT_LENGTH = 4;
  static HOUR_LIMIT = 23;
  static MINUTE_LIMIT = 59;
  static TIME_MIN = 0;

  /**
   * @param {string} start
   * @param {string} end
   * @param {string} lunch
   * @returns {string}
   */
  static calculate(start, end, lunch = null) {
    this.#validate(start, end);

    if (lunch) this.#validateLunch(lunch);

    const [startHour, startMinute] = this.#serialize(start);
    const [endHour, endMinute] = this.#serialize(end);

    let lunchHour = '';
    let lunchMinutes = '';

    if (lunch) {
      const [lunchTimeHour, lunchTimeMinutes] = this.#serialize(lunch);

      lunchHour = lunchTimeHour;
      lunchMinutes = lunchTimeMinutes;
    }

    this.#validateHours(startHour, endHour);
    this.#validateMinutes(startMinute, endMinute);

    if (lunchHour) this.#validateHours(lunchHour);
    if (lunchMinutes) this.#validateMinutes(lunchMinutes);

    const startToSeconds = this.#toSeconds(startHour, startMinute);
    const endToSeconds = this.#toSeconds(endHour, endMinute);
    let diffTime = endToSeconds - startToSeconds;

    if (diffTime < 0) {
      diffTime *= -1;
    }

    if (lunchHour && lunchMinutes) {
      diffTime -= this.#toSeconds(lunchHour, lunchMinutes);
    }

    return this.#format(diffTime);
  }

  static #format(totalSeconds) {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    totalSeconds %= 3600;
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');

    return `${hours}:${minutes}`;
  }

  /**
   * @param {number} start
   * @param {number} end
   * @throws Error
   */
  static #validateHours(start = null, end = null) {
    if (
      (start && (start < this.TIME_MIN || start > this.HOUR_LIMIT)) ||
      (end && (end < this.TIME_MIN || end > this.HOUR_LIMIT))
    ) {
      throw new Error('Hora tem que ser maior que 0 e menor que 23.');
    }
  }

  /**
   * @param {number} start
   * @param {number} end
   * @throws Error
   */
  static #validateMinutes(start = null, end = null) {
    if (
      (start && (start < this.TIME_MIN || start > this.MINUTE_LIMIT)) ||
      (end && (end < this.TIME_MIN || end > this.MINUTE_LIMIT))
    ) {
      throw new Error('Minuto tem que ser maior que 0 e menor que 59.');
    }
  }

  /**
   * @param hour
   * @param minute
   * @returns {number}
   */
  static #toSeconds(hour, minute) {
    return (hour * 60 * 60) + (minute * 60);
  }

  /**
   * @param {string} time
   * @returns {number[]}
   */
  static #serialize(time) {
    const timeList = time.split('');
    const cleanStringList = timeList
      .filter(item => !isNaN(parseInt(item)));

    while (cleanStringList.length <= this.SHORT_LENGTH) {
      cleanStringList.push('0');
    }

    const groupedHour = [];
    let counter = 0;
    let text = '';
    let index = 0;

    while (groupedHour.length <  cleanStringList.length) {
      if (counter === 2) {
        groupedHour.push(text);

        text = '';
        counter = 0;
      }

      text += cleanStringList[index];
      counter++;
      index++;
    }

    return groupedHour.map(hour => parseInt(hour));
  }

  /**
   * @param {string} start
   * @param {string} end
   * @throws Error
   * @returns {void}
   */
  static #validate(start, end) {
    if (!start || !end) {
      throw new Error('Parâmetros de início e fim são obrigatórios.');
    }

    if (typeof start !== 'string' || typeof end !== 'string') {
      throw new Error('Parâmetros têm que ser string');
    }

    if (
      start.length > HourWorker.LIMIT_LENGTH ||
      end.length > HourWorker.LIMIT_LENGTH
    ) {
      throw new Error('Horas podem ser apenas no formato HHmm ou HH:mm');
    }
  }

  /**
   * @param {string} lunch
   * @throws Error
   * @returns {void}
   */
  static #validateLunch(lunch) {
    if (typeof lunch !== 'string') {
      throw new Error('Parâmetros de almoço tem que ser string');
    }

    if (
      lunch.length > HourWorker.LIMIT_LENGTH
    ) {
      throw new Error('Horas podem ser apenas no formato HHmm ou HH:mm');
    }
  }
}

module.exports = { HourWorker };
