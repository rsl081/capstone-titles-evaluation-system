using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class Pagination<T> where T : class
    {
        public Pagination(int count, IReadOnlyList<T> data)
        {
            Count = count;
            Data = data;
        }
        
        public int Count { get; set; }
        public IReadOnlyList<T> Data { get; set; }
    }
}