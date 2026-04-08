const form = document.getElementById('calorie-form');
const result = document.getElementById('result');

function formatCalories(value) {
  return Math.round(value).toLocaleString('en-US');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const sex = document.getElementById('sex').value;
  const age = Number(document.getElementById('age').value);
  const weight = Number(document.getElementById('weight').value);
  const height = Number(document.getElementById('height').value);
  const activity = Number(document.getElementById('activity').value);
  const goal = document.getElementById('goal').value;

  if (!age || !weight || !height || !activity) {
    result.textContent = 'Please fill in all fields with valid values.';
    return;
  }

  const bmr =
    sex === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  const maintenance = bmr * activity;

  let target = maintenance;
  let goalLabel = 'Maintenance';

  if (goal === 'cut') {
    target = maintenance * 0.85;
    goalLabel = 'Cut (-15%)';
  }

  if (goal === 'bulk') {
    target = maintenance * 1.1;
    goalLabel = 'Bulk (+10%)';
  }

  result.innerHTML = `
    <strong>Estimated daily result</strong><br>
    BMR: ${formatCalories(bmr)} kcal<br>
    Maintenance: ${formatCalories(maintenance)} kcal<br>
    ${goalLabel}: <strong>${formatCalories(target)} kcal</strong>
  `;
});
const form = document.getElementById('calorie-form');
const result = document.getElementById('result');

function formatCalories(value) {
  return Math.round(value).toLocaleString('en-US');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const sex = document.getElementById('sex').value;
  const age = Number(document.getElementById('age').value);
  const weight = Number(document.getElementById('weight').value);
  const height = Number(document.getElementById('height').value);
  const activity = Number(document.getElementById('activity').value);
  const goal = document.getElementById('goal').value;

  if (!age || !weight || !height || !activity) {
    result.textContent = 'Please fill in all fields with valid values.';
    return;
  }

  const bmr =
    sex === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  const maintenance = bmr * activity;

  let target = maintenance;
  let goalLabel = 'Maintenance';

  if (goal === 'cut') {
    target = maintenance * 0.85;
    goalLabel = 'Cut (-15%)';
  }

  if (goal === 'bulk') {
    target = maintenance * 1.1;
    goalLabel = 'Bulk (+10%)';
  }

  result.innerHTML = `
    <strong>Estimated daily result</strong><br>
    BMR: ${formatCalories(bmr)} kcal<br>
    Maintenance: ${formatCalories(maintenance)} kcal<br>
    ${goalLabel}: <strong>${formatCalories(target)} kcal</strong>
  `;
});
