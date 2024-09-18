const { HourWorker } = require('../src/HourWorker');

describe('calcular horas trabalhadas do dia', () => {
  it('retornar Error se não tiver todo os parâmetros válidos', () => {
    expect(() => HourWorker.calculate(undefined, null)).toThrow(Error);
  });

  it('retornar Error se não for string', () => {
    expect(() => HourWorker.calculate(123, null)).toThrow(Error);
  });

  it('retornar Error se o formato inserido for diferente de HH:mm', () => {
    expect(() => HourWorker.calculate('09:02:20', '12:20:04')).toThrow(Error);
  });

  it('retornar Error se não se encaixar no período de tempo', () => {
    expect(() => HourWorker.calculate('24:67', '45:67')).toThrow(Error);
  });

  it('retornar a diferença correta entre os horários inseridos', () => {
    expect(HourWorker.calculate('08:00', '12:00')).toBe('04:00');
  });
});

describe('calcular intervalor de almoço', () => {
  it('retornar Error se não tiver todo os parâmetros válidos', () => {
    expect(() => HourWorker.calculate(undefined, null, null)).toThrow(Error);
  });

  it('retornar Error se não for string', () => {
    expect(() => HourWorker.calculate(123, null, 4344)).toThrow(Error);
  });

  it('retornar Error se o formato inserido for diferente de HH:mm', () => {
    expect(() => HourWorker.calculate('09:02:20', '12:20:04', '01:30:12')).toThrow(Error);
  });

  it('retornar Error se não se encaixar no período de tempo', () => {
    expect(() => HourWorker.calculate('24:67', '45:67', '56:54')).toThrow(Error);
  });

  it('retornar a diferença correta entre os horários inseridos', () => {
    expect(HourWorker.calculate('08:00', '12:00', '01:30')).toBe('02:30');
  });
});

describe('calcular horários invertidos', () => {
  it('retornar valores mesmo quando invertidos sem almoço', () => {
    expect(HourWorker.calculate('12:00', '08:00')).toBe('04:00');
  });

  it('retornar valores mesmo quando invertidos com almoço', () => {
    expect(HourWorker.calculate('12:00', '08:00', '01:30')).toBe('02:30');
  });
});

describe('calcular horários mesmo sem pontuação', () => {
  it('retornar a diferença correta entre os horários inseridos', () => {
    expect(HourWorker.calculate('0800', '1200')).toBe('04:00');
  });

  it('retornar a diferença correta entre os horários inseridos com almoço', () => {
    expect(HourWorker.calculate('0800', '1200', '0130')).toBe('02:30');
  });

  it('retornar a diferença correta entre os horários inseridos invertidos sem almoço', () => {
    expect(HourWorker.calculate('1200', '0800')).toBe('04:00');
  });

  it('retornar a diferença correta entre os horários inseridos invertidos com almoço', () => {
    expect(HourWorker.calculate('1200', '0800', '0130')).toBe('02:30');
  });
});
