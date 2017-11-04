

export function friendlyTime (date) {
  var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  var postDate = new Date(date)

  return (
    monthNames[postDate.getMonth()] + ' ' + postDate.getDate() + ', ' + postDate.getFullYear()
  )
}
