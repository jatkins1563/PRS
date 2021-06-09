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
    public class RequestsController : ControllerBase
    {
        private readonly PRS_serverContext _context;

        public RequestsController(PRS_serverContext context)
        {
            _context = context;
        }

        // GET: api/Requests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Request>>> GetRequest()
        {
            return await _context.Requests.ToListAsync();
        }

        // GET: api/Requests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Request>> GetRequest(int id)
        {
            var request = await _context.Requests
                                    .Include(r => r.User)
                                    .Include(r => r.RequestLines)
                                        .ThenInclude(r1 => r1.Product)
                                    .SingleOrDefaultAsync(r => r.Id == id);

            if (request == null)
            {
                return NotFound();
            }

            return request;
        }

        // GET: api/Requests/review/5
        [HttpGet("review/{id}")]
        public async Task<ActionResult<IEnumerable<Request>>> GetReviews(int id)
        {
            var request = await _context.Requests
                .Where(r => r.UserId != id)
                .ToListAsync();

            if (request == null)
            {
                return NotFound();
            }

            return request;
        }

        // PUT: api/Requests/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRequest(int id, Request request)
        {
            if (id != request.Id)
            {
                return BadRequest();
            }

            _context.Entry(request).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RequestExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // PUT: api/Requests/5/review
        [HttpPut("{id}/review")]
        public async Task<IActionResult> Review(int id)
        {
            var request = await _context.Requests.FindAsync(id);
            if (id != request.Id)
            {
                return BadRequest();
            }

            if(request.Total <= 0)
            {
                throw new ArgumentOutOfRangeException("Total must be greater than zero to review!");
            }
            else if(request.Total <= 50)
            {
                request.Status = request.Approved;
            }
            else
            {
                request.Status = request.Review;
            }

            _context.Entry(request).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RequestExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // PUT: api/Requests/5/approve
        [HttpPut("{id}/approve")]
        public async Task<IActionResult> Approve(int id, Request request)
        {
            if (id != request.Id)
            {
                return BadRequest();
            }

            request.Status = request.Approved;

            _context.Entry(request).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RequestExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // PUT: api/Requests/5/reject
        [HttpPut("{id}/reject")]
        public async Task<IActionResult> Reject(int id, Request request)
        {
            if (id != request.Id)
            {
                return BadRequest();
            }

            if(request.RejectionReason == null)
            {
                throw new Exception("Rejection failed. Reason required to set \"REJECTED\" status.");
            }

            request.Status = request.Rejected;

            _context.Entry(request).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RequestExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Requests
        [HttpPost]
        public async Task<ActionResult<Request>> PostRequest(Request request)
        {
            _context.Requests.Add(request);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRequest", new { id = request.Id }, request);
        }

        // DELETE: api/Requests/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Request>> DeleteRequest(int id)
        {
            var request = await _context.Requests.FindAsync(id);
            if (request == null)
            {
                return NotFound();
            }

            _context.Requests.Remove(request);
            await _context.SaveChangesAsync();

            return request;
        }

        private bool RequestExists(int id)
        {
            return _context.Requests.Any(e => e.Id == id);
        }
    }
}