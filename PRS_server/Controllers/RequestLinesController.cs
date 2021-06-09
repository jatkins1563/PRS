using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PRS_server.Data;
using PRS_server.Models;

namespace PRS_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestLinesController : ControllerBase
    {
        private readonly PRS_serverContext _context;

        public RequestLinesController(PRS_serverContext context)
        {
            _context = context;
        }

        //recalc called by POST/PUT/DEL, recalculates Request.Total after requestLine is added/changed/removed
        private async Task RecalculateRequestTotal(int requestId)
        {
            var request = await _context.Requests.FindAsync(requestId);
            
            var reqLines = await _context.RequestLines
                                .Include(r => r.Product)
                                .Where(r => r.RequestId == requestId)
                                .ToListAsync();

            var total = 0.00m;

            foreach(var r in reqLines)
            {
                total += r.Quantity * r.Product.Price;
            }

            request.Total = total;

            _context.Entry(request).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return;

        }

        // GET: api/RequestLines
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RequestLine>>> GetRequestLine()
        {
            return await _context.RequestLines.ToListAsync();
        }

        // GET: api/RequestLines/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RequestLine>> GetRequestLine(int id)
        {
            var requestLine = await _context.RequestLines.FindAsync(id);

            if (requestLine == null)
            {
                return NotFound();
            }

            return requestLine;
        }

        // PUT: api/RequestLines/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRequestLine(int id, RequestLine requestLine)
        {
            if (id != requestLine.Id)
            {
                return BadRequest();
            }
            //checks for invalid quantity
            if (requestLine.Quantity <= 0)
            {
                throw new ArgumentOutOfRangeException("Quantity must be greater than 0.");
            }

            _context.Entry(requestLine).State = EntityState.Modified;

            //adds requestLine to request collection
            var request = await _context.Requests.FindAsync(requestLine.RequestId);
            var oldLine = await _context.RequestLines.FindAsync(id);

            request.RequestLines.Remove(oldLine);
            request.RequestLines.Add(requestLine);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RequestLineExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            //recalculaterequesttotal
            await RecalculateRequestTotal(requestLine.RequestId);

            return NoContent();
        }

        // POST: api/RequestLines
        [HttpPost]
        public async Task<ActionResult<RequestLine>> PostRequestLine(RequestLine requestLine)
        {
            //checks for invalid quantity
            if (requestLine.Quantity <= 0)
            {
                throw new ArgumentOutOfRangeException("Quantity must be greater than 0.");
            }

            _context.RequestLines.Add(requestLine);

            //adds requestLine to request collection
            var request = await _context.Requests.FindAsync(requestLine.RequestId);
            request.RequestLines.Add(requestLine);

            await _context.SaveChangesAsync();

            //recalculaterequesttotal
            await RecalculateRequestTotal(requestLine.RequestId);

            return CreatedAtAction("GetRequestLine", new { id = requestLine.Id }, requestLine);
        }

        // DELETE: api/RequestLines/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<RequestLine>> DeleteRequestLine(int id)
        {
            var requestLine = await _context.RequestLines.FindAsync(id);
            if (requestLine == null)
            {
                return NotFound();
            }

            _context.RequestLines.Remove(requestLine);

            //removes requestLine from request collection
            var request = await _context.Requests.FindAsync(requestLine.RequestId);
            request.RequestLines.Remove(requestLine);

            await _context.SaveChangesAsync();

            //recalculaterequesttotal
            await RecalculateRequestTotal(requestLine.RequestId);
            return requestLine;
        }

        private bool RequestLineExists(int id)
        {
            return _context.RequestLines.Any(e => e.Id == id);
        }
    }
}
