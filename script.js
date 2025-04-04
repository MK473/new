function updateTimes() {
    const baseTime = new Date();
    const resultsDiv = document.getElementById('converterResults');
    
    // Generate time zone comparisons
    const timeZones = ['America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney'];
    
    let html = '';
    timeZones.forEach(zone => {
        const time = baseTime.toLocaleString('en-US', {
            timeZone: zone,
            hour12: true,
            hour: 'numeric',
            minute: '2-digit'
        });
        
        html += `
            <div class="time-card">
                <h3>${zone.split('/')[1]}</h3>
                <p>${time}</p>
                <p>${zone}</p>
            </div>
        `;
    });
    
    resultsDiv.innerHTML = html;
}

// Update every second
setInterval(updateTimes, 1000);
updateTimes();