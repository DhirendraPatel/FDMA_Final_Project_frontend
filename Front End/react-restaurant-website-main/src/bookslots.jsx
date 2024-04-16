const bookslots = ()=>{

return (
    <>
    <div className="slots">
                {data.map((i) => (
                  <button
                    className="btn btn-danger"
                    disabled={i.bStatus === "booked" ? true : false}
                    
                   >
                    {i.bBooktime}-{i.bBooktime + 1}-{i.bStatus}
                  </button>
                ))}
              </div>
    </>
)

}

export default bookslots;