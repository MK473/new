// script.js - Updated Version
let selectedTimeZones = ['America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney'];

function populateTimeZoneSelector() {
    const selector = document.getElementById('baseTimezone');
    const timeZones = Intl.supportedValuesOf('timeZone');
    
    // Clear existing options
    selector.innerHTML = '';
    
    // Add default options
    const defaultOptions = [
        { value: 'local', text: 'Local Time' },
        { value: 'UTC', text: 'UTC' }
    ];
    
    defaultOptions.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        selector.appendChild(option);
    });

    // Add all valid time zones
    timeZones.forEach(zone => {
        const option = document.createElement('option');
        option.value = zone;
        option.textContent = zone;
        selector.appendChild(option);
    });
}

function addTimezone() {
    const selector = document.getElementById('baseTimezone');
    const selectedZone = selector.value;
    
    if (selectedZone === 'local') {
        selectedTimeZones.push(Intl.DateTimeFormat().resolvedOptions().timeZone);
    } else if (selectedZone && !selectedTimeZones.includes(selectedZone)) {
        selectedTimeZones.push(selectedZone);
    }
    
    updateTimes();
}

function updateTimes() {
    const baseTime = new Date();
    const resultsDiv = document.getElementById('converterResults');
    
    let html = '';
    selectedTimeZones.forEach(zone => {
        try {
            const time = baseTime.toLocaleString('en-US', {
                timeZone: zone,
                hour12: true,
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit'
            });
            
            html += `
                <div class="time-card">
                    <h3>${zone.split('/')[1] || zone}</h3>
                    <p class="time-display">${time}</p>
                    <p class="timezone-id">${zone}</p>
                    <button class="remove-btn" onclick="removeTimezone('${zone}')">×</button>
                </div>
            `;
        } catch (e) {
            console.error(`Invalid time zone: ${zone}`);
        }
    });
    
    resultsDiv.innerHTML = html;
}

function removeTimezone(zone) {
    selectedTimeZones = selectedTimeZones.filter(tz => tz !== zone);
    updateTimes();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    populateTimeZoneSelector();
    setInterval(updateTimes, 1000);
    updateTimes();
});